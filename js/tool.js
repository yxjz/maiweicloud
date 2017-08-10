/**
 * Created by Administrator on 2017/4/11.
 */


//根据hash获取页面要渲染的数据
function getData(data){
    var hash = location.hash;
    var path = hash?hash.substring(7).split('/'):[];
    if(path.length==0){
        //第一次
        var arr = data;
    }else{
        //进入子级
        var arr = fn(data,path);
    }

    function fn(data,path){
        var arr1 = [];
        fn1(data,path);
        function fn1(data,path){
            if(path.length==0){
                arr1 = data;
                return;
            }
            data.forEach(function(a){
                if(a.name == path[0]){
                    path.shift();
                    fn1(a.child,path)
                }
            })
        }
        return arr1;
    }
    return arr;
}

//清除内容区域，渲染全部文件夹
function show(data){
    main1_list.innerHTML = '';
    data.forEach(function(a){
        createBox(a);
    })

}
//根据一条数据渲染一个文件夹，type，新建的时候传,a是show的参数

function createBox(a,type){
    var doc = document.createElement('li');
    doc.classList.add('doc','fl');
    main1_list.appendChild(doc);
    var top = document.createElement('div');
    top.classList.add('top');
    doc.appendChild(top);

    var text = document.createElement('p');
    text.className = 'text';
    text.innerHTML = a.name;
    doc.appendChild(text);

    var cho = document.createElement('input');
    cho.type = "checkbox";
    cho.className = 'cho';
    doc.appendChild(cho);
    //每一个没选中时为真
    //cho.onOff = false;
    //移入移出
    doc.check = false;
    doc.onmouseenter = function(){
        console.log(123)
        if(!this.check){
                doc.classList.add('active');
        }
    };
    doc.onmouseleave = function(ev){
        if(!this.check){
            doc.classList.remove('active');
        }
    };
       cho.onclick = function (ev) {
           ev.stopPropagation();

        if(this.checked){
            doc.check = true;
        }else{
            doc.check = false;

        }
        checkAll()
    };
    //插入第一位
    if(type){
        main1_list.insertBefore(doc,main1_list.firstElementChild)
    }else{
        main1_list.appendChild(doc);
    }
//双击hash改变
        doc.ondblclick = function (ev) {
        if(ev.target!=cho){
            s.push('/'+a.name);
            location.hash = 'path='+s.join('');
        }
    }
    //框选
    box(minmain,div1);
    //文件夹右键
    rmune(doc,cho);
    tree.innerHTML = treeFn(data);
    for(var i=0;i<h33.length;i++){
        treeOpen(i);
    }
}

//判断当前同级数据是否重名
function checkName(data,name){
    return data.some(function(a){
        return a.name==name;
    })
}
//生成一条新数据
function newData(data,Name){
    var j = {
        id:++maxId,
        name:Name,
        child:[]
    };
    data.unshift(j);
    return j;
}
//找到id最大值
function getMaxId(data){
    var max = 0;
    fn(data);
    function fn(data){
        data.forEach(function(a){
            if(a.id>max){
                max = a.id;
            }
            if(a.child.length){
                fn(a.child);
            }
        })
    }
    return max;
}
//找到可用的新建系列名字
function findNewName(data){
    //1.找
    var arr = [];
    data.forEach(function(a){
        if(a.name=='新建文件夹'){
            arr[0] = true;
        }
        var name = Number(a.name.split('新建文件夹(').join('').split(')').join(''));
        if(name){
            arr[name] = true;
        }
    })
    var n = 0;
    //console.log(arr);
    //2.返回可用
    if(arr[0]==undefined){
        return '新建文件夹';
    }
    if(arr.every(function(a){
            return a!=undefined;
        })){
        n = arr.length;
    }
    for(var i=0;i<arr.length;i++){
        if(arr[i]==undefined){
            n = i;
            break;
        }
    }
    return '新建文件夹('+n+')';
}

//全选
function checkAll(){
    var m = 0;
    for(var i=0;i<cho.length;i++){
        if(cho[i].checked){
            m++;
        }
    }
    if(m == cho.length){
        inp.checked = true;
    }else{
        inp.checked = false;
    }
}
//新建、重命名的确定和取消
function sure1() {
    var inp = hide.getElementsByTagName('input')[0];
    inp.value = '新建文件夹';
    inp.checked = false;
    var val = inp.value;
    if(checkName(Data,val)){
        //重名
        var name = Number(val.split('新建文件夹(').join('').split(')').join(''));
        if(val=='新建文件夹'||name){
            createBox(newData(Data,findNewName(Data)),1);
        }
    }else{
        createBox(newData(Data,val),1);
    }
    hide.style.display = 'none';
}
function cancle1() {
    hide.style.display = 'none';
}

//重命名
function newNa() {

    var arrCho = Array.from(cho);
    var chec = null;
    chec = arrCho.filter(function (a) {
        return a.checked;
});

    if (chec.length == 1) {

        hide.style.display = 'block';
        //文件夹名称
        var txt = chec[0].previousElementSibling.innerHTML;
        //重命名框
        var inp = hide.getElementsByTagName('input')[0];
        inp.value = txt;
        sure.onclick = function () {

           if(checkName(Data,inp.value)){
               alert('重名')
           }else{
               var arr = Data.filter(function (a) {
                   return a.name == txt;
               });
               arr[0].name = inp.value;
               hide.style.display = 'none';
               //需要重新写，不能用已声明过的txt.
               chec[0].previousElementSibling.innerHTML= inp.value ;
               tree.innerHTML = treeFn(data);
               for(var i=0;i<h33.length;i++){
                   treeOpen(i);
               }
           }
        };
        cancle.onclick = function () {
            hide.style.display = 'none';
        }
    }
}

//面包屑导航
function bread() {
    var hash = location.hash;
    var path = hash?hash.substring(7).split('/'):[];
    ming.innerHTML = '';
    //渲染
    var as = document.createElement('a');
    as.href = 'javascript:;';
    as.innerHTML = '返回上一级 | ';
    var as1 = document.createElement('a');
    as1.href = 'javascript:;';
    as1.innerHTML = '全部文件 ';
    ming.appendChild(as);
    ming.appendChild(as1);
    //循环自动生成的
    path.forEach(function (a) {
        var as2 = document.createElement('a');
        as2.innerHTML ='|'+a;
        as2.href = 'javascript:;';
        ming.appendChild(as2);
    })
    var ass = ming.getElementsByTagName('a');
    for(var i=0;i<ass.length-1;i++){
        ass[i].index = i;
        ass[i].onclick = function(){
            h = path.slice(0,this.index-1);
            if(h.length){
                location.hash = 'path=/'+h.join('/');
            }else{
                location.hash = '';
            }
            for(var i=this.index+1;i<ass.length;i++){
                s.pop();
            }
        }
    }
}
//框选
function box(obj1,boj2) {
    obj1.onmousedown = function (ev) {
    //不能宽在文件li上，如果框选上就return。
    if(ev.target.parentNode.tagName=='LI'){
        return;
    }
        ev.preventDefault();
        ev.stopPropagation();
        var oL = ev.clientX - obj1.getBoundingClientRect().left;
        var oT = ev.clientY - obj1.getBoundingClientRect().top;
        obj1.onmousemove = function (ev) {
            if (ev.which == 1) {
                var iL = ev.clientX - obj1.getBoundingClientRect().left;
                var iT = ev.clientY - obj1.getBoundingClientRect().top;
                var w = Math.abs(iL - oL);
                var h = Math.abs(iT - oT);
                var l = iL > oL ? oL : iL;
                var t = iT > oT ? oT : iT;
                boj2.style.width = w + 'px';
                boj2.style.height = h + 'px';
                boj2.style.left = l + 'px';
                boj2.style.top = t + 'px';
                checked1 = []
                for (var i = 0; i < docs.length; i++) {
                    if (duang(docs[i], boj2)) {
                        docs[i].style.background = 'pink';
                        docs[i].lastElementChild.checked = true;
                        docs[i].lastElementChild.style.display = 'block';
                        checked1.push(docs[i]);
                    } else {
                        console.log(456)
                        docs[i].lastElementChild.checked = false;
                        docs[i].style.background = '';
                        docs[i].lastElementChild.style.display = 'none';
                    }
                }
            }
        }
        obj1.onmouseup = function () {
            obj1.onmousemove = null;
            boj2.style.cssText = '';
        }
    }
    var arr1 = [];
    for (var i = 0; i < docs.length; i++) {
        docs[i].onmousedown = function (ev) {

            if (checked1.includes(this)) {
                ev.stopPropagation();
                ev.preventDefault();
                    minmain.onmousemove = function (ev) {
                        var l = ev.clientX - minmain.getBoundingClientRect().left-kuang.offsetWidth/2;
                        var t =ev.clientY - minmain.getBoundingClientRect().top-kuang.offsetHeight/2;
                        kuang.style.left = l+'px';
                        kuang.style.top = t+'px';
                        kuang.style.display = 'block';
                        //每次进来清空
                        arr1 = [];
                        for (var i = 0; i < docs.length; i++) {
                            if (duang(kuang, docs[i])) {
                                //框选的文件不变色，跳过，未框选的变色，
                                if(checked1.includes(docs[i])){
                                   continue;
                                  }else{
                                    arr1.push(docs[i]);
                                    docs[i].style.background = 'blue';
                                    docs[i].lastElementChild.checked = true;
                                    docs[i].lastElementChild.style.display = 'block';
                                }
                            } else {
                             docs[i].lastElementChild.checked = false;
                             docs[i].style.background = '';
                             docs[i].lastElementChild.style.display = 'none';
                             }
                        }
                    }
                    minmain.onmouseup = function(){
                        minmain.onmouseup =minmain.onmousemove = null;
                        kuang.style.display = 'none';
                        for (var i = 0; i < docs.length; i++) {
                            docs[i].style.background = '';
                            docs[i].lastElementChild.checked = false;
                            docs[i].lastElementChild.style.display = 'none';
                        }
                        var j = null;
                        //碰到的那个数组arr1长度不为0，就说明碰到，循环当前的数组，找到名字和碰到的那个一样的，赋值
                        if(arr1.length!=0){
                            Data.forEach(function (a) {
                                    if(a.name==arr1[0].firstElementChild.nextElementSibling.innerHTML){
                                        j=a;
                                }
                            })
                            for(var i=0;i<Data.length;i++){
                                //当前的数组循环找框选的数组，找到就塞j的child里,并在当前数据删除框选上的
                                for(var k=0;k<checked1.length;k++){
                                    if(Data[i].name == checked1[k].firstElementChild.nextElementSibling.innerHTML){
                                        j.child.push(Data[i])
                                        Data.splice(i,1)
                                    }
                                }
                            }
                        }
                        show(Data)
                }
            }
        }
    }


}

//碰撞检测函数
//obj2被撞
    function duang(obj1, obj2) {
        var pos1 = obj1.getBoundingClientRect();
        var pos2 = obj2.getBoundingClientRect();
        //没碰上的情况
        if (pos1.right < pos2.left || pos1.bottom < pos2.top || pos1.left > pos2.right || pos1.top > pos2.bottom) {
            //有一个符合就是没碰上
            return false;
        } else {
            return true;
        }
    }
//右键空白菜单
/*
* obj:可点区域
* obj1；右键菜单
*
* */
function wrighth(obj,obj1) {
    obj.oncontextmenu = function (ev) {
        rhand.style.display = 'none';
        ev.preventDefault();
        obj1.style.display = 'block';
        //能够移动的最大距离
        var maxL = obj.clientWidth - obj1.offsetWidth;
        var maxT = obj.clientHeight - obj1.offsetHeight;
        //鼠标右键的距离
        var L = ev.clientX-obj.getBoundingClientRect().left;
        var T = ev.clientY-obj.getBoundingClientRect().top;
        var l = L<maxL?L:maxL;
        var t = T<maxT?T:T-obj1.offsetHeight;
        obj1.style.top = t+'px';
        obj1.style.left = l+'px';
    }
    document.onclick = function (ev) {
        ev.preventDefault();
        ev.stopPropagation();
        if(!(ev.target.parentNode==obj1)){
            obj1.style.cssText = '';
        }
        wright1.style.display = 'none';
    }

}

//点击文件夹右键
function rmune(obj1,obj2) {
    obj1.oncontextmenu = function (ev) {
        ev.preventDefault();
        ev.stopPropagation();
        for(var i=0;i<docs.length;i++){
            rhand.style.display = 'none';
            cho[i].checked = false;
            cho[i].style.display = 'none';
            docs[i].style.border = '';
        }
        rhand.style.display = 'block';
        wright1.style.display = 'none';
        var L = ev.clientX - minmain.getBoundingClientRect().left;
        var T = ev.clientY - minmain.getBoundingClientRect().top;
        rhand.style.left = L + 'px';
        rhand.style.top = T + 'px';
        obj1.style.border = '1px solid silver';
        obj2.checked = true;
        obj2.style.display = 'block';
        document.onclick = function () {
            wright1.style.display = 'none';
            rhand.style.display = 'none';
            obj2.checked = false;
            obj2.style.display = 'none';
            obj1.style.border = '';
        }
    }

}
//树
function treeFn(arr){
    var str = fn(arr);
    function fn(arr){
        //console.log(arr)
        var str2 = '';
        arr.forEach(function(a){
            if(a.child.length==0){
                //没有子集
                str2 += '<li><h3><a href=""></a><span></span>'+a.name+'</h3></li>';
            }else{
                //有子集
                str2 += '<li ><h3 class="h33"><a href=""></a><span></span>'+a.name+'</h3><ul class="two1">'+fn(a.child)+'</ul></li>';
            }
        })
        return str2;
    }
    return str;

}









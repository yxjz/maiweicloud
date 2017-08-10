

//拿数据
var Data = getData(data);
var maxId = getMaxId(data);
//渲染
show(Data);
tree.innerHTML = treeFn(data);
//var aim = tree.getElementsByTagName('h3');

for(var i=0;i<h33.length;i++){
    treeOpen(i);
}
function treeOpen(n) {
    var aim1 = tree.getElementsByClassName('h33')[n];
    var twoUl = tree.getElementsByTagName('ul')[n];
    var onOff = true;
    aim1.onclick = function () {
        if(onOff){
            twoUl.classList.add('active1')
        }else{
            twoUl.classList.remove('active1')
        }
        onOff=!onOff;
    }
}




window.onhashchange = function(){
    //hash改变，重新拿数据，重新渲染
    main1_list.innerHTML = '';
    Data = getData(data);
    show(Data);
    bread();
   // tree.innerHTML = treeFn(Data);

};

//新建文件夹按钮
nb.onclick = function() {
    hide.style.display = 'block';
    //点击确定
    sure.onclick = function () {
        sure1();
    };
    //点击取消
    cancle.onclick = function () {
        cancle1();
    }
};
hide
//删除
dele.onclick = function () {
    for(var i=0;i<cho.length;i++){
        if(cho[i].checked){
            main1_list.removeChild(cho[i].parentNode);
            data.splice(i,1);
            i--;
        }
    }
    tree.innerHTML = treeFn(data);
    for(var i=0;i<h33.length;i++){
        treeOpen(i);
    }
}
//全选
inp.onclick = function () {
    for(var i=0;i<cho.length;i++){
        if(this.checked){
            cho[i].checked = true;
            cho[i].parentNode.classList.add('active')
        }else{
            cho[i].checked = false;
            cho[i].parentNode.classList.remove('active')
        }
    }
    checkAll()
};
//重命名
newName.onclick = function () {
    newNa()
};
//框选
box(minmain,div1);
//空白处菜单
wrighth(minmain,wright1);
//解决 hide点击不上的问题,添加按下事件，阻止冒泡
hide.onmousedown = function (ev) {
    ev.stopPropagation();
}





























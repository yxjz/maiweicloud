/**
 * Created by Administrator on 2017/4/11.
 */
/**
 * Created by Administrator on 2017/4/11.
 */

var section = document.getElementsByTagName('section')[0];
var header  = section.getElementsByClassName('header')[0];
var newName = header.getElementsByClassName('new_name')[0];
var dele = header.getElementsByClassName('delete')[0];
var left = header.getElementsByClassName('left')[0];
var nb = left.getElementsByClassName('nb')[0];
var leftLis = left.getElementsByTagName('li');
var del = left.getElementsByTagName('li');////??
var content = section.getElementsByClassName('content')[0];
var main1 = content.getElementsByClassName('main1')[0];
var main1_list= main1.getElementsByClassName('main1_list')[0];
var checkA = main1.getElementsByClassName('check_all')[0];
var doc = main1_list.getElementsByClassName('doc')[0];
var docs = main1_list.getElementsByClassName('doc');
var new_item = main1.getElementsByClassName('new_item')[0];
var text1 = main1.getElementsByClassName('text1')[0];
var none1 = document.getElementsByClassName('none1')[0];
var sure = document.getElementsByClassName('sure')[0];
var cancle = document.getElementsByClassName('cancle')[0];
var hide = document.getElementsByClassName('hide')[0];
var cho = document.getElementsByClassName('cho');//所有
var inp = document.getElementById('inp');
var num = 0;
//框选
var checked1 = [];
var kuang = document.getElementsByClassName('kuang')[0];
var div1 = document.getElementsByClassName('div1')[0];
var minmain = document.getElementsByClassName('minmain')[0];
var text =  document.getElementsByClassName('text')[0]
//面包屑
var ming = document.getElementsByClassName('ming')[0];
var s = [];
 newName.onOff = false;
 //空白右键
var wright1 = document.getElementsByClassName('wright_hand')[0];
//文件夹右键
var rhand = document.getElementsByClassName('right_hand')[0];
// tree
var tree = document.getElementsByClassName('tree')[0];
var hash = location.hash;
var h = hash?hash.split('/'):[];


var h33 = tree.getElementsByClassName('h33');
var data = [
    {
        id:1,
        name:'周杰伦',
        child:[
            {
                id:4,
                name:'床边故事',
                child:[]
            },
            {
                id:5,
                name:'床边故事(1)',
                child:[
                    {
                        id:6,
                        name:'告白气球(1)',
                        child:[]
                    }
                ]
            }
        ]
    },
    {
        id:2,
        name:'陈奕迅(1)',
        child:[
            {
                id:7,
                name:'红玫瑰',
                child:[
                ]
            }
        ]
    },
    {
        id:3,
        name:'周迅(2)',
        child:[
        ]
    }

];

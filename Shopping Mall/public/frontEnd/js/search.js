$(function(){
  //当前页面载入的时候显示历史纪录
  showHistoryData();

  // setHistoryData("nick");
  //点击搜索按钮将关键词加入到历史记录中
  var searchInput = $('.search-box input');
  $('#search-btn').on('tap',function(){
    // searchInput = "";
    var keyWord = searchInput.val();
    setHistoryData(keyWord);
    // cpnsole.log(keyWord);
    location.href = './searchList.html?proName='+keyWord;
    // location.href = './searchList.html?proName='+keyWord;
    showHistoryData();
  })
  $('#clear-history').on('tap',function(){
    localStorage.removeItem('ltHistory');
    showHistoryData();
  })
  $(".search-history-list").on("tap","i",function(){
    var deleteData = $(this).siblings('span').html();
    removeHistoryData(deleteData);
    // removeHistoryData(deleteData);
    showHistoryData();
  })
  //点击历史记录里表中的字  把这个字放到历史栏中
  $('.search-history-list').on('tap','span',function(){
    var keyWord = $(this).html();
    console.log(keyWord);
    //关键字传入  hrml中
    location.href = './searchList.html?proName='+keyWord;
  })
})




  //获取历史纪录

  var getHistoryData = function (){
    return JSON.parse(window.localStorage.getItem('ltHistory')||'[]');
  }
  // console.log(getHistoryData);

  //设置搜索记录

  var setHistoryData = function (value){
    var list = getHistoryData();
    console.log(list);

  //便利数据（去除重复数据）
  $.each(list,function(i,item){
    if(value == item){
      list.splice(i,1);
    }
  });
  list.push(value);
  localStorage.setItem('ltHistory',JSON.stringify(list));

}
//移除数据

  //获取历史记录
  var removeHistoryData = function(value){
    var list = getHistoryData();
    
    //找到和历史记录列表中的某一项 一样的数组 元素 切掉
    $.each(list,function(i,item){
      if(value == item){
        list.splice(i,1);
      }
    })
    //把切掉后的数组元素  放回到历史纪录中
    window.localStorage.setItem('ltHistory',JSON.stringify(list));

  }

  //显示历史记录
   var showHistoryData = function(){
     var list = getHistoryData();
     if(list.length == 0) {
       //告诉用户没有历史记录
       $('.empty-history').show();
       $('.search-history').hide();
     }else {
       //展示历史记录
       var historyList = template('historyTemplate',{list:list});
       $('.search-history-list').html(historyList);
       $('.search-history').show();
      //  $('.search-history').show();
       $('.empty-history').hide();
     }
   }
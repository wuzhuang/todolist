angular.module("myapp",[]).controller("ctrl",["$scope","$filter",function($scope,$filter) {
   /* $scope.$watch("",function(v1,v2){
        if(v1!=v2){
            $scope.
        }
    })*/

    /*数据*/
    $scope.data = localStorage.messages ? JSON.parse(localStorage.messages) : [];
    /*当前的index*/
    $scope.currentid = $scope.data[0] ? $scope.data[0].id : null;
    /*获取当前的数组*/
    $scope.currentArr = $scope.currentid ? $scope.data[getid($scope.currentid)] : {title: ""};
    /*查询数据*/
    $scope.$watch("search",function(){
        var arr=$filter("filter")($scope.data,{title:$scope.search})
        if(arr.length>0){
            $scope.currentid=arr[0].id;
            $scope.currentArr = $scope.currentid ? $scope.data[getid($scope.currentid)] : {title: ""};
        }
    })
    /*添加列表*/
    $scope.addlist = function () {
        $scope.isshow=true;
        var obj = {};
        obj.title = "新建文件";
        obj.id = setId();
        obj.son =[];
        $scope.data.push(obj);
        $scope.currentid = obj.id;
        $scope.currentArr = $scope.currentid ? $scope.data[getid($scope.currentid)] : {title: ""};
        localStorage.messages = JSON.stringify($scope.data);
    }

    /*删除列表*/
    $scope.dellist=function(id){
        var index=getid(id);
        var len=$scope.data.length-1;
        if(len==0){
            $scope.currentid=null;
            $scope.currentArr=$scope.currentid?$scope.data[getid($scope.currentid)]:{title:""};
        }else{
            if(index==len){
                $scope.currentid=$scope.data[len-1].id;
                $scope.currentArr=$scope.currentid?$scope.data[getid($scope.currentid)]:{title:""};
            }else if(index<len){
               $scope.currentid=$scope.data[index+1].id;
               $scope.currentArr=$scope.currentid?$scope.data[getid($scope.currentid)]:{title:""};
            }
        }
        $scope.data.splice(index,1);
        localStorage.messages=JSON.stringify($scope.data);
    }
    /*数据获得焦点*/
    $scope.focus=function(id){
        $scope.isshow=true;
        //var index=getid(id);
        $scope.currentid=id;
        $scope.currentArr=$scope.currentid?$scope.data[getid($scope.currentid)]:{title:""};
    }
    /*失去焦点*/
    $scope.blur=function() {
        localStorage.messages=JSON.stringify($scope.data);
    }


/*处理具体的内容*/

    /*添加内容*/

    $scope.addcon=function(){
        var obj={};
        obj.son ={};
        var son=$scope.currentArr.son;
        var id=son.length>0?son[son.length-1].id+1:1;
        $scope.currentArr.son.push({con:"",id:id});
        localStorage.messages=JSON.stringify($scope.data);
    }

/*删除内容*/
    $scope.delcon=function(id) {
        /*对象-->传址*/
        var son=$scope.currentArr.son;
        for(var i=0;i<son.length;i++){
            if(son[i].id==id){
                son.splice(i,1);
            }

        }
        localStorage.messages=JSON.stringify($scope.data);

    }
    /*内容失去焦点*/
    $scope.conblur=function() {
        localStorage.messages=JSON.stringify($scope.data);
    }

/*已经完成的列表*/
    $scope.isshow=true;
    $scope.successData=localStorage.success ? JSON.parse(localStorage.success) : [];
    $scope.done=function(id){
        var son=$scope.currentArr.son;
        var title=$scope.currentArr.title;
        for(var i=0;i<son.length;i++){
            if(son[i].id==id){
                var obj=son.splice(i,1);
                obj[0].parent=title;
                $scope.successData.push(obj);
                break;
            }
        }
        localStorage.success=JSON.stringify($scope.successData);
        localStorage.messages=JSON.stringify($scope.data);

    }
    /*显示已完成信息*/
    $scope.showdone=function(id) {
        $scope.isshow = false;
    }
/*删除已完成信息*/
    $scope.deldone=function(id){
        var arr=$scope.successData;
        for(var i=0;i<arr.length;i++){
            if(arr[i].id==id){
                arr.splice(i,1);
                break;
            }
        }
        localStorage.success=JSON.stringify($scope.successData);
    }
    function getid(id) {
        var data=$scope.data;
         var len=data.length;
        for (var i=0;i<len;i++) {
            if (data[i].id==id) {
                return i;
            }
        }
    }
    
    function setId(){
        if($scope.data.length>0){
        return $scope.data[$scope.data.length-1].id+1;
    }
    else {
            return 1;
        }
    }
}])
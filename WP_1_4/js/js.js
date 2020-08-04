/*
1. 학점 평균 , 명수 계산
2. 학생 추가버튼 적용
3. 학생 삭제 버튼 적용
+a 학생 추가시에 내가 원하는 내용을 추가할 수 있도록
*/
let bt_add = document.getElementById("add");
let bt_delete = document.getElementById("delete");
let content = document.getElementsByClassName("content");
let grade = document.getElementsByClassName("grade");
let tbody = document.getElementById("tbody");

let avgGrade = document.getElementById("avgGrade"); // 학점 평균
let total = document.getElementById("total"); // 전체 인원 수

//
let chk_checked = document.getElementsByClassName("chk");
let checkedList = new Array();
//

//이벤트 핸들러
bt_add.addEventListener("click",add_row);
bt_delete.addEventListener("click",delete_handler);


window.onload = function(){
    avgGrade.innerHTML =0;
    total.innerHTML =content.length;
    for(let j=0;j<content.length;j++){
        chk_checked[j].addEventListener("click",getChecked);
    }
    cal();    
   
}
function getChecked(){
    let arr = new Array();
    for(let i=0;i<chk_checked.length;i++){
        if(chk_checked[i].checked){
            arr.push(i);
        }
    }
    checkedList=arr;
    console.log(checkedList);
}
function cal(){
    let sum=0;
    
    for(let i=1;i<content.length+1;i++){
        let td_grade = grade[i].innerHTML;
        switch(td_grade){
            case 'A+': sum+=4.5;
                break;
            case 'A0': sum+=4;
                break;
            case 'B+': sum+=3.5;
                break;
            case 'B0': sum+=3;
                break;
            case 'C+': sum+=2.5;
                break;
            case 'C0': sum+=2;
                break;
            default : sum+=1;
            break;
        }
    
    }
    sum=sum/content.length;
    sum=sum.toFixed(2);

    if(content.length==0){
        sum=0;
    }
    avgGrade.innerHTML=sum;
    total.innerHTML=content.length;
}


function add_row(){
    
    let i_name = document.getElementById("input_name").value;
    let i_num = document.getElementById("input_number").value;
    let i_age = document.getElementById("input_age").value;
    let i_grade = document.getElementById("input_grade").value;
    let i_exp = document.getElementById("input_exp").value;
    
    
    if(i_name==''||i_num==''||i_age==''||i_grade==''){
        alert("필수기입란을 작성해 주세요.");
    }else{
        let row = tbody.insertRow(-1);
        row.className += "content";
        
        let cell1 = row.insertCell(0);
        let cell2 = row.insertCell(1);
        let cell3 = row.insertCell(2);
        let cell4 = row.insertCell(3);
        let cell5 = row.insertCell(4);
        let cell6 = row.insertCell(5);
        
        let checkbox = document.createElement("input");
        checkbox.className +="chk";
        checkbox.type ="checkbox";
        checkbox.addEventListener("click",getChecked);
        
        cell1.appendChild(checkbox);
        cell5.className+="grade";
        cell2.innerHTML=i_name;
        cell3.innerHTML=i_num;
        cell4.innerHTML=i_age;
        cell5.innerHTML=i_grade;
        cell6.innerHTML=i_exp;
        
    }
    
    cal();

}
function delete_handler(){
    console.log(checkedList.length);
    if(checkedList.length>0){
        delete_checked();
    }else{
        delete_last();
    }
}
function delete_last(){
    tbody.deleteRow(-1);
    cal();
    alert("삭제되었습니다.");

}
function delete_checked(){
    while(checkedList.length>0){
        tbody.deleteRow(checkedList.pop());
        // console.log("삭제");
        // console.log(content);
    }
    cal();

}

let StoredScore = JSON.parse(localStorage.getItem("Score"));

let AllDist = [
    {"id":0,"name":"Srikakulam","lev":0,status:"Never been here",color:"white"},
    {"id":1,"name":"Vizianagaram","lev":0,status:"Never been here",color:"white"},
    {"id":2,"name":"Vishakapatnam","lev":0,status:"Never been here",color:"white"},
    {"id":3,"name":"East Godavari","lev":0,status:"Never been here",color:"white"},
    {"id":4,"name":"West Godavari","lev":0,status:"Never been here",color:"white"},
    {"id":5,"name":"Krishna","lev":0,status:"Never been here",color:"white"},
    {"id":6,"name":"Guntur","lev":0,status:"Never been here",color:"white"},
    {"id":7,"name":"Prakasam","lev":0,status:"Never been here",color:"white"},
    {"id":8,"name":"Nellore","lev":0,status:"Never been here",color:"white"},
    {"id":9,"name":"Kurnool","lev":0,status:"Never been here",color:"white"},
    {"id":10,"name":"Kadapa","lev":0,status:"Never been here",color:"white"},
    {"id":11,"name":"Anatapuram","lev":0,status:"Never been here",color:"white"},
    {"id":12,"name":"Chitoor","lev":0,status:"Never been here",color:"white"},
]

const AddColor = (id,btn) => {
    if(btn==="plus"){
        if(AllDist[id].lev<3){
            AllDist[id].lev+=1;
        }
        else{
            return 0;
        }
    }
    else{
        if(AllDist[id].lev>0){
            AllDist[id].lev-=1;
        }
        else{
            return 0;
        }
    }
    switch (AllDist[id].lev) {
    case 0:
        AllDist[id].color = "white";
        AllDist[id].status="Never been here";
        break;
    case 1:
        AllDist[id].color = "lightyellow";
        AllDist[id].status="Passed Here"
        break;
    case 2:
        AllDist[id].color = "pink";
        AllDist[id].status="Visted Here"
        break;
    case 3:
        AllDist[id].color = "lightgreen";
        AllDist[id].status="Stayed Here"
        break;
    }

    AddDist();
    CountScore();
}

function AddDist(){
    document.querySelector("#content").innerHTML='';
    for(let i of AllDist){
        document.querySelector("#content").innerHTML += `
        <div id="D-${i.id}" class="DT" style="background-color:${i.color}">
            ${i.name}
            <br/>
            <p style="font-size:12px;color:#3A1078">[${i.status}]</p><br/>
            &nbsp; 
            <button onclick="AddColor(${i.id},'plus')">+</button> 
            &nbsp; <button onclick="AddColor(${i.id},'minus')">-</butoon>
        </div>`
    }
}

window.onload = () => {
    if(StoredScore){
        AllDist = StoredScore;
    }
    AddDist();
    CountScore();
}

function CountScore(){
    let score=0;
    for(let i of AllDist){
        score+=i.lev;
    }
    document.querySelector("#score").innerHTML = `Score : ${score}`;
}

function SaveAsImg(){
    html2canvas(document.body).then((canvas) => {
        var link = document.createElement("a");
        link.download = "Score.png";
        link.href = canvas.toDataURL();
        link.click();
    });
}

function Save(){
    localStorage.setItem("Score",JSON.stringify(AllDist));
    alert("Saved Successfully")
}

function Reset(){
    localStorage.removeItem('Score');
    alert("Reseted Successfully");
    location.reload();
}

function Share(){
    if(navigator.share){
        navigator.share({
            title: "Travel-Score",
            text: "Check out Travel Score",
            url: "https://google.com/",
          });
    }
}

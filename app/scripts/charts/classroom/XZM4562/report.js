$(document).ready(function(){
  $.getJSON("../../json/charts/courses/XZM4562.json", function(data){
      var json = data; 
      var lessons = [];
      var scores = [];  
      for( var i = 0; i < json.users.length; i++){
          var l = "";
          var t = 0 ;
          var s = 0;
          for( var j = 0; j < json.users[i].videos.title.length; j++){
              l += "<li> - "+json.users[i].videos.title[j]+"<li>";
              t += json.users[i].videos.time[j];
          }
          lessons.push({x:i+1,y:t,label:json.users[i].username,name:json.users[i].username,subject:l});
          scores.push({x:i+1,y:json.users[i].scores[0],name:json.users[i].username,subject:"แบบทดสอบ"})
      }
      (function () {
          var chart = new CanvasJS.Chart("summarySet",
          {
            animationEnabled: true,
            title:{
              text: "ภาพรวมการเรียน | เซต"
            
            },         
            axisY: {
              title: "เวลา (นาที)",
              interval: 20,
              maximum: 100
              
            },
            axisY2: {
              title: "คะแนนสอบ (คะแนน)",
              interval: 20,
              maximum: 100
              
            },
            axisX: {
              labelAngle: -45,
              interval: 1
              
            },
            legend: {
              fontSize: 16
            },
            toolTip: {
                      shared: true
              },

            data: [{        
              type: "column",
              legendText: "เวลา",
              showInLegend: true,
              toolTipContent: "<h6><a href = '#/profile/'{label}> {label}</a> ({y} นาที)</h6> <h6>{name1}</h6><ul>{subject}</ul>",      
              dataPoints: lessons
              },{        
              type: "spline",
              axisYType: "secondary",
              legendText: "คะแนนสอบ",
              showInLegend: true,
              toolTipContent: "<h6>คะแนนสอบ ({y} คะแนน)</h6></h6> <h6>{name1}</h6><ul>{subject}</ul>",     
              dataPoints: scores

            },

            ]
          });

          chart.render();
      })();
  });
})
    
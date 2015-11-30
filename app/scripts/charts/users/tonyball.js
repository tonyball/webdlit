$(document).ready(function(){

    $.getJSON("../../json/charts/users/tonyball.json", function(data){
        var json = data;
        var lessons = [];
        var scores = [];     
        for( var i = 0; i < json.videos.length; i++) {
            if(json.videos[i].title.length != 0){
              var time = 0 ;
              var l = "";
              for (var j = 0; j < json.videos[i].title.length; j++) {
                time += json.videos[i].time[j];
                l += "<li> - "+json.videos[i].title[j]+"<li>";
              }
              lessons.push({x:i+1,y:time,subject1:l,name1:"เซต"});
            }else{
              lessons.push({x:i+1,y:0,subject1:"",name1:""});
            }
        }

        for( var i = 0; i < json.scores.length; i++) {
            if(json.scores[i].score != 0){
                scores.push({x:i+1,y:json.scores[i].score})
            }else{
                scores.push({x:i+1,y:0})
            }

        }

        (function() {
            var chart = new CanvasJS.Chart("chart",
            {
              animationEnabled: true,
              title:{
                text: "ภาพรวมการเรียน | "+json.month
              
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
                title: "วันที่",
                interval: 1
                
              },
              width: 1003,
              height: 400,

              toolTip: {
                shared: true
              },
              legend: {
                fontSize: 16
              },

              data: [{        
                type: "stackedColumn",
                showInLegend: true,
                legendText: "บทเรียน",
                showInLegend: true,
                toolTipContent: "<h6>บทเรียน ({y} นาที)</h6><h5>{name1}</h5> <ul>{subject1}</ul> ",      
                dataPoints: lessons
              },{        
                type: "spline",
                axisYType: "secondary",
                legendText: "แบบทดสอบ",
                showInLegend: true,
                toolTipContent: "<h6>แบบทดสอบ ({y} คะแนน)</h6><h5>{name1}</h5> <ul>{subject1}</ul> ",     
                dataPoints: scores
              }
              ]
            });

            chart.render();
        })();

    });



})
mapboxgl.accessToken = 'pk.eyJ1Ijoia2FmdSIsImEiOiJja2JsMm56aGQwaGhiMnJxbm1xdG95NWdtIn0.vh9wYdHgfMpV426QLBAHew';

var map = new mapboxgl.Map({
  container: 'map', // container id
  style: 'mapbox://styles/mapbox/light-v10', // use a base map without any data
  center: [-74, 40.7],
  zoom: 10,
});

let merged19_day;
let merged19_night;
let merged20_day;
let merged20_night;
let hex_info;

Promise.all([d3.csv('https://raw.githubusercontent.com/kafuka0105/cusp_capstone/master/notebooks/merged19_v3.csv'),d3.csv('https://raw.githubusercontent.com/kafuka0105/cusp_capstone/master/notebooks/merged20.csv'),d3.csv('https://raw.githubusercontent.com/kafuka0105/cusp_capstone/master/notebooks/hex_info.csv')]).then(([merged19,merged20,hex]) => {
  merged19_day = merged19.filter(d=>d['night?'] === '0');
  merged19_night = merged19.filter(d=>d['night?'] === '1');
  merged20_day = merged20.filter(d=>d['night?'] === '0');
  merged20_night = merged20.filter(d=>d['night?'] === '1');
  hex_info = hex;
  console.log('!')
}).then(() => {
  map.on('load', function() {
  map.addSource('hexagon',{
    type:'geojson',
    data:  'https://raw.githubusercontent.com/kafuka0105/cusp_capstone/master/notebooks/hexagon_crs.geojson',
    promoteId: 'hex_id_8',
  });
  
  map.addLayer({
    id:'hexagon',
    source:'hexagon',
    type:'fill',
    paint:{
      'fill-opacity':0.5,
      'fill-outline-color':'#444',
      'fill-color':'#007bff',
    },
  });
  
  map.on('click', 'hexagon', function (e) {
    document.getElementById('chart_overlay').style.display = 'none';
    let clicked_feature = e.features[0];
    const target_day_19 = merged19_day.filter(d=>d['hex_id_8']===clicked_feature.id);
    const target_night_19 = merged19_night.filter(d=>d['hex_id_8']===clicked_feature.id);
    const target_day_20 = merged20_day.filter(d=>d['hex_id_8']===clicked_feature.id);
    const target_night_20 = merged20_night.filter(d=>d['hex_id_8']===clicked_feature.id);
    const target_hex = hex_info.filter(d=>d['hex_id_8']===clicked_feature.id);
    
    const hex_id = target_hex
              .map(d => d['hex_id_8']);
    const day_pop = target_hex
              .map(d => d['day_pop']);
    const night_pop = target_hex
              .map(d => d['night_pop']);
    const venue_count = target_hex
              .map(d => d['venue_count']);
    const comm_gfa = target_hex
              .map(d => d['ComArea']);
    const resi_gfa = target_hex
              .map(d => d['ResArea']);
    const boro = target_hex
              .map(d => d['boro_name']);
    
    
    
    const mta_inflow_2019_day = target_day_19
              .map(d => d['mta_inflow_counts'])
              .map(d => +d);
    const mta_inflow_2019_night = target_night_19
              .map(d => d['mta_inflow_counts'])
              .map(d => +d);
    const mta_inflow_2020_day = target_day_20
              .map(d => d['mta_inflow_counts'])
              .map(d => +d);
    const mta_inflow_2020_night = target_night_20
              .map(d => d['mta_inflow_counts'])
              .map(d => +d);
    const mta_outflow_2019_day = target_day_19
              .map(d => d['mta_outflow_counts'])
              .map(d => +d);
    const mta_outflow_2019_night = target_night_19
              .map(d => d['mta_outflow_counts'])
              .map(d => +d);
    const mta_outflow_2020_day = target_day_20
              .map(d => d['mta_outflow_counts'])
              .map(d => +d);
    const mta_outflow_2020_night = target_night_20
              .map(d => d['mta_outflow_counts'])
              .map(d => +d);
    
    const citi_inflow_2019_day = target_day_19
              .map(d => d['citi_inflow_counts'])
              .map(d => +d);
    const citi_inflow_2019_night = target_night_19
              .map(d => d['citi_inflow_counts'])
              .map(d => +d);
    const citi_inflow_2020_day = target_day_20
              .map(d => d['citi_inflow_counts'])
              .map(d => +d);
    const citi_inflow_2020_night = target_night_20
              .map(d => d['citi_inflow_counts'])
              .map(d => +d);
    const citi_outflow_2019_day = target_day_19
              .map(d => d['citi_outflow_counts'])
              .map(d => +d);
    const citi_outflow_2019_night = target_night_19
              .map(d => d['citi_outflow_counts'])
              .map(d => +d);
    const citi_outflow_2020_day = target_day_20
              .map(d => d['citi_outflow_counts'])
              .map(d => +d);
    const citi_outflow_2020_night = target_night_20
              .map(d => d['citi_outflow_counts'])
              .map(d => +d);
    
    const fhv_inflow_2019_day = target_day_19
              .map(d => d['fhv_inflow_counts'])
              .map(d => +d);
    const fhv_inflow_2019_night = target_night_19
              .map(d => d['fhv_inflow_counts'])
              .map(d => +d);
    const fhv_outflow_2019_day = target_day_19
              .map(d => d['fhv_outflow_counts'])
              .map(d => +d);
    const fhv_outflow_2019_night = target_night_19
              .map(d => d['fhv_outflow_counts'])
              .map(d => +d);
    
    const timeline = target_day_19
              .map(d => d['time'])
              .map(d => d.slice(0,-5));
    
    mta_inflow_19_day = {
        type: "scatter",
        mode: "lines",
        name: 'Day Usage 19',
        x: timeline,
        y: mta_inflow_2019_day,
        line: {color: '#2ca02c',
               dash: 'dot',
               width: 1.2}
      },
      
    mta_inflow_20_day = {
        type: "scatter",
        mode: "lines",
        name: 'Day Usage 20',
        x: timeline,
        y: mta_inflow_2020_day,
        line: {color: '#2ca02c',
               width: 1}
      },
    
    mta_inflow_19_night = {
        type: "scatter",
        mode: "lines",
        name: 'Night Usage 19',
        x: timeline,
        y: mta_inflow_2019_night,
        line: {color: '#1f77b4',
               dash: 'dot',
               width: 1.2}
      },
      
    mta_inflow_20_night = {
        type: "scatter",
        mode: "lines",
        name: 'Night Usage 20',
        x: timeline,
        y: mta_inflow_2020_night,
        line: {color: '#1f77b4',
               width: 1}
      },
      
    mta_outflow_19_day = {
        type: "scatter",
        mode: "lines",
        name: 'Day Usage 19',
        x: timeline,
        y: mta_outflow_2019_day,
        line: {color: '#2ca02c',
               dash: 'dot',
               width: 1.2}
      },
      
    mta_outflow_20_day = {
        type: "scatter",
        mode: "lines",
        name: 'Day Usage 20',
        x: timeline,
        y: mta_outflow_2020_day,
        line: {color: '#2ca02c',
               width: 1}
      },
    
    mta_outflow_19_night = {
        type: "scatter",
        mode: "lines",
        name: 'Night Usage 19',
        x: timeline,
        y: mta_outflow_2019_night,
        line: {color: '#1f77b4',
               dash: 'dot',
               width: 1.2}
      },
      
    mta_outflow_20_night = {
        type: "scatter",
        mode: "lines",
        name: 'Night Usage 20',
        x: timeline,
        y: mta_outflow_2020_night,
        line: {color: '#1f77b4',
               width: 1}
      },
    
    citi_inflow_19_day = {
        type: "scatter",
        mode: "lines",
        name: 'Day Usage 19',
        x: timeline,
        y: citi_inflow_2019_day,
        line: {color: 'rgb(234, 153, 153)',
               dash: 'dot',
               width: 1.2}
      },
      
    citi_inflow_20_day = {
        type: "scatter",
        mode: "lines",
        name: 'Day Usage 20',
        x: timeline,
        y: citi_inflow_2020_day,
        line: {color: 'rgb(234, 153, 153)',
               width: 1}
      },
    
    citi_inflow_19_night = {
        type: "scatter",
        mode: "lines",
        name: 'Night Usage 19',
        x: timeline,
        y: citi_inflow_2019_night,
        line: {color: 'rgb(142, 124, 195)',
               dash: 'dot',
               width: 1.2}
      },
      
    citi_inflow_20_night = {
        type: "scatter",
        mode: "lines",
        name: 'Night Usage 20',
        x: timeline,
        y: citi_inflow_2020_night,
        line: {color: 'rgb(142, 124, 195)',
               width: 1}
      },
    
    citi_outflow_19_day = {
        type: "scatter",
        mode: "lines",
        name: 'Day Usage 19',
        x: timeline,
        y: citi_outflow_2019_day,
        line: {color: 'rgb(234, 153, 153)',
               dash: 'dot',
               width: 1.2}
      },
      
    citi_outflow_20_day = {
        type: "scatter",
        mode: "lines",
        name: 'Day Usage 20',
        x: timeline,
        y: citi_outflow_2020_day,
        line: {color: 'rgb(234, 153, 153)',
               width: 1}
      },
    
    citi_outflow_19_night = {
        type: "scatter",
        mode: "lines",
        name: 'Night Usage 19',
        x: timeline,
        y: citi_outflow_2019_night,
        line: {color: 'rgb(142, 124, 195)',
               dash: 'dot',
               width: 1.2}
      },
      
    citi_outflow_20_night = {
        type: "scatter",
        mode: "lines",
        name: 'Night Usage 20',
        x: timeline,
        y: citi_outflow_2020_night,
        line: {color: 'rgb(142, 124, 195)',
               width: 1}
      },
      
    fhv_inflow_19_day = {
        type: "scatter",
        mode: "lines",
        name: 'Day Usage',
        x: timeline,
        y: fhv_inflow_2019_day,
        line: {color: 'rgb(255, 217, 102)',
               width: 1}
      },
    
    fhv_inflow_19_night = {
        type: "scatter",
        mode: "lines",
        name: 'Night Usage',
        x: timeline,
        y: fhv_inflow_2019_night,
        line: {color: 'rgb(219, 64, 82)',
               width: 1}
      },
      
    fhv_outflow_19_day = {
        type: "scatter",
        mode: "lines",
        name: 'Day Usage',
        x: timeline,
        y: fhv_outflow_2019_day,
        line: {color: 'rgb(255, 217, 102)',
               width: 1}
      },
    
    fhv_outflow_19_night = {
        type: "scatter",
        mode: "lines",
        name: 'Night Usage',
        x: timeline,
        y: fhv_outflow_2019_night,
        line: {color: 'rgb(219, 64, 82)',
               width: 1}
      },
      
    data1 = [mta_inflow_19_day,mta_inflow_20_day,mta_inflow_19_night,mta_inflow_20_night],
    data2 = [mta_outflow_19_day,mta_outflow_20_day,mta_outflow_19_night,mta_outflow_20_night],
    data3 = [citi_inflow_19_day,citi_inflow_20_day,citi_inflow_19_night,citi_inflow_20_night],
    data4 = [citi_outflow_19_day,citi_outflow_20_day,citi_outflow_19_night,citi_outflow_20_night],
    data5 = [fhv_inflow_19_day,fhv_inflow_19_night],
    data6 = [fhv_outflow_19_day,fhv_outflow_19_night],

      layout1 = {
        title: 'MTA Inflow Usage 2019 vs 2020',
        titlefont: {
          "size": 20
        },
        xaxis: {
          title: "Date",
          nticks: 7,
          ticks: 'outside',
          mirror: true,
          linewidth: 1,
          tickfont: {
            size: 10,
          }
        },
        yaxis: {
          title: "Traffic Counts",
          nticks: 8,
          ticks: 'outside',
          mirror: true,
          linewidth: 1,
          tickfont: {
            size: 10,
          }
        },
        legend: {
          y: 1,
          traceorder: 'reversed',
          font: {
            size: 10
            }
          }
      },
      
      layout2 = {
        title: 'MTA Outflow Usage 2019 vs 2020',
        titlefont: {
          "size": 20
        },
        xaxis: {
          title: "Date",
          nticks: 7,
          ticks: 'outside',
          mirror: true,
          linewidth: 1,
          tickfont: {
            size: 10,
          }
        },
        yaxis: {
          title: "Traffic Counts",
          nticks: 8,
          ticks: 'outside',
          mirror: true,
          linewidth: 1,
          tickfont: {
            size: 10,
          }
        },
        legend: {
          y: 1,
          traceorder: 'reversed',
          font: {
            size: 10
            }
          }
      },
      
      layout3 = {
        title: 'Citibike Inflow Usage 2019 vs 2020',
        titlefont: {
          "size": 20
        },
        xaxis: {
          title: "Date",
          nticks: 7,
          ticks: 'outside',
          mirror: true,
          linewidth: 1,
          tickfont: {
            size: 10,
          }
        },
        yaxis: {
          title: "Traffic Counts",
          nticks: 8,
          ticks: 'outside',
          mirror: true,
          linewidth: 1,
          tickfont: {
            size: 10,
          }
        },
        legend: {
          y: 1,
          traceorder: 'reversed',
          font: {
            size: 10
            }
          }
      },
      
      layout4 = {
        title: 'Citibike Outflow Usage 2019 vs 2020',
        titlefont: {
          "size": 20
        },
        xaxis: {
          title: "Date",
          nticks: 7,
          ticks: 'outside',
          mirror: true,
          linewidth: 1,
          tickfont: {
            size: 10,
          }
        },
        yaxis: {
          title: "Traffic Counts",
          nticks: 8,
          ticks: 'outside',
          mirror: true,
          linewidth: 1,
          tickfont: {
            size: 10,
          }
        },
        legend: {
          y: 1,
          traceorder: 'reversed',
          font: {
            size: 10
            }
          }
      },
      
      layout5 = {
        title: 'FHV Inflow Usage 2019',
        titlefont: {
          "size": 20
        },
        xaxis: {
          title: "Date",
          nticks: 7,
          ticks: 'outside',
          mirror: true,
          linewidth: 1,
          tickfont: {
            size: 10,
          }
        },
        yaxis: {
          title: "Traffic Counts",
          nticks: 8,
          ticks: 'outside',
          mirror: true,
          linewidth: 1,
          tickfont: {
            size: 10,
          }
        },
        legend: {
          y: 1,
          traceorder: 'reversed',
          font: {
            size: 10
            }
          }
      },
      
      layout6 = {
        title: 'FHV Outflow Usage 2019',
        titlefont: {
          "size": 20
        },
        xaxis: {
          title: "Date",
          nticks: 7,
          ticks: 'outside',
          mirror: true,
          linewidth: 1,
          tickfont: {
            size: 10,
          }
        },
        yaxis: {
          title: "Traffic Counts",
          nticks: 8,
          ticks: 'outside',
          mirror: true,
          linewidth: 1,
          tickfont: {
            size: 10,
          }
        },
        legend: {
          y: 1,
          traceorder: 'reversed',
          font: {
            size: 10
            }
          }
      },
    

      document.getElementById('hexbinid').innerText=hex_id;
      document.getElementById('daypop').innerText=day_pop;
      document.getElementById('nightpop').innerText=night_pop;
      document.getElementById('venuecount').innerText=venue_count;
      document.getElementById('commGFA').innerText=comm_gfa;
      document.getElementById('resiGFA').innerText=resi_gfa;
      document.getElementById('boro').innerText=boro;
      chart1 = document.getElementById('chart1');
      chart2 = document.getElementById('chart2');
      chart3 = document.getElementById('chart3');
      chart4 = document.getElementById('chart4');
      chart5 = document.getElementById('chart5');
      chart6 = document.getElementById('chart6');
    
     Plotly.newPlot(chart1, data1, layout1);
     Plotly.newPlot(chart2, data2, layout2);
     Plotly.newPlot(chart3, data3, layout3);
     Plotly.newPlot(chart4, data4, layout4);
     Plotly.newPlot(chart5, data5, layout5);
     Plotly.newPlot(chart6, data6, layout6);
    
    });  



  
});
  
 
});
      
//       NYC_County = county.filter(d=>d.county==='New York City'),
      
//       US_cases = {
//         type: "scatter",
//         mode: "lines",
//         name: 'US Cases',
//         x: us.map(d => d.date),
//         y: us.map(d => d.cases),
//         line: {color: '#1f77b4'}
//       },
      
//       NYS_cases = {
//         type: "scatter",
//         mode: "lines",
//         name: 'NYS Cases',
//         x: NY_State.map(d => d.date),
//         y: NY_State.map(d => d.cases),
//         line: {color: '#ff7f0e'}
//       },

//       NYC_cases = {
//         type: "scatter",
//         mode: "lines",
//         name: 'NYC Cases',
//         x: NYC_County.map(d => d.date),
//         y: NYC_County.map(d => d.cases),
//         line: {color: '#2ca02c'}
//       },
      
//       // groupby state
//       grouped = state.groupBy(['state']),
//       newcases_list = [];
      
//       // Using for loops to store daily new cases per state
//       for (var j=0; j < grouped.length; j++){
//         for (i=grouped[j].values.length-1; i > 0; i--){
//           var temp_val = 0;
//           temp_val = grouped[j].values[i].cases - grouped[j].values[i-1].cases;
//           grouped[j].values[i].cases = Number(temp_val);
//           newcases_list.push(grouped[j].values[i])
//         }
//       }

//       data = [US_cases,NYS_cases,NYC_cases],

//       layout = {
//         title: 'Covid-19 Cases in NYC vs. NYS and US',
//         xaxis: {
//           title: "Date",
//           nticks: 10,
//           ticks: 'outside',
//           mirror: true,
//           linewidth: 1,
//         },
//         yaxis: {
//           title: "Number of Cases",
//           nticks: 10,
//           ticks: 'outside',
//           mirror: true,
//           linewidth: 1,
//         },
//       },
      
//       chart = document.getElementById('chart');
  
//      Plotly.newPlot(chart, data, layout);
  
//   chart.on('plotly_hover', event => {
//       // In order to change color, we need to update all
//       // item colors, and give the specific one a different color
//       let index = event.points[0].pointIndex, // index of the data element
//           cur_date = us[index]['date'], // index of date from the us dataset
//           perState = newcases_list.filter(row => (row['date'] == cur_date))
//                               .map(row => [row['state'],Number(row['cases'])]); //Sort data based on the date from the chart
//      setStates(perState);
//     });
  
//   function setStates(perState){
//      perState.forEach(d=>{
//        map.setFeatureState({
//          source:'statedata',
//          id:d[0],
//        },{
//          count:d[1],
//        });
//      });
     
//      let steps = 7,
//         maxV = d3.max(perState.map(d => d[1])),
//         domain = d3.range(0,maxV,maxV/steps),
//         colors = d3.schemeBlues[steps],
//         filter = new Array();
    
//      domain.slice(1).forEach((v,k)=>{
//       filter.push(['<',['feature-state','count'],v]);
//       filter.push(colors[k]);
//       });
//       filter.push(colors[colors.length-1]);
//       filter = [
//         'case',
//         ['==', ['feature-state','count'], null],'rgba(0,0,0,0)',
//         ...filter,
//       ];
//      map.setPaintProperty('statedata','fill-color', filter);
//   };

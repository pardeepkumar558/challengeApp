import { Component, OnInit } from '@angular/core';
declare var d3: any;
import { Entity } from '../models/entity';
import { MediaService } from '../services/media.service';
import { BusinessEntity } from '../models/business-entity'

@Component({
  selector: 'app-custom-chart',
  templateUrl: './custom-chart.component.html',
  styleUrls: ['./custom-chart.component.css']
})
export class CustomChartComponent implements OnInit {
  currentYear: number = 2020;
  min: number = 1849;
  max: number = 2020;
  step: number = 1;
  businessEntityData:BusinessEntity[];
  constructor(private _mediaService: MediaService) { }

  ngOnInit(): void {
   
    this._mediaService.GetBusinessData().subscribe(
      (data:any) => {
        this.businessEntityData=data.default as BusinessEntity[];
         let YearData:BusinessEntity[];
         YearData=[];
         YearData=this.businessEntityData.filter(x=>x.BusinessStartYear==this.currentYear.toString());
        const grouped = this.groupBy(YearData, dt => dt.Neighborhoods);
        this.createChart(grouped);
        console.log("this is data");
        console.log(grouped);
      }
    );
  }

  filterData()
  {

    let YearData:BusinessEntity[];
    YearData=[];
    YearData=this.businessEntityData.filter(x=>x.BusinessStartYear==this.currentYear.toString());
    const grouped = this.groupBy(YearData, dt => dt.Neighborhoods);
    this.createChart(grouped);
  }
  createChart(chartInputData) {
    
    //To clean Chart
    document.getElementById("mychart").innerHTML="";

    var yOverview;
    var DATA_COUNT = 50;
    var MAX_LABEL_LENGTH = 30;

    var data = [];

    // for (var i = 0; i < DATA_COUNT; i++) {
    //   var datum = new Entity();
    //   datum.label = stringGen(MAX_LABEL_LENGTH)
    //   datum.value = Math.floor(Math.random() * 600);
    //   data.push(datum);
      
    // }
    for(var entity of chartInputData)
    {var datum = new Entity();
        datum.label = entity[0];
        datum.value = entity[1].length;
        data.push(datum);

    }
    data=data.sort((a, b) => {
      return b.value-a.value;
    });
    console.log("chart Data is mainly");
    console.log(data)

    

    var margin = { top: 20, right: 10, bottom: 20, left: 40 };
    var marginOverview = { top: 30, right: 10, bottom: 20, left: 40 };
    var selectorHeight = 40;
    var width = 1020 - margin.left - margin.right;
    var height = 400 - margin.top - margin.bottom - selectorHeight;
    var heightOverview = 80 - marginOverview.top - marginOverview.bottom;

    var maxLength = d3.max(data.map(function (d) { return d.label.length }))
    var barWidth = maxLength *15;
    var numBars = Math.round(width / barWidth);
    var isScrollDisplayed = barWidth * data.length > width;


    console.log(isScrollDisplayed)
    console.log("gggggggggggggggggggggg");
    console.log(d3);

    var xscale = d3.scale.ordinal()
      .domain(data.slice(0, numBars).map(function (d) { return d.label; }))
      .rangeBands([0, width], .2);

    var yscale = d3.scale.linear()
      .domain([0, d3.max(data, function (d) { return d.value; })])
      .range([height, 0]);

    var xAxis = d3.svg.axis().scale(xscale).orient("bottom");
    var yAxis = d3.svg.axis().scale(yscale).orient("left");

    var svg = d3.select("#mychart").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom + selectorHeight);

    var diagram = svg.append("g")
      .attr("transform", "translate(" + (margin.left+20) + "," + margin.top + ")");

    diagram.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0, " + height + ")")
      .attr("style", " fill: black;")
      .call(xAxis);

    diagram.append("g")
      .attr("class", "y axis")
      .attr("style", " fill: black;")
      .call(yAxis);

    var bars = diagram.append("g");

    bars.selectAll("rect")
      .data(data.slice(0, numBars), function (d) { return d.label; })
      .enter().append("rect")
      .attr("class", "bar")
      .attr("x", function (d) { return xscale(d.label); })
      .attr("y", function (d) { return yscale(d.value); })
      .attr("width", xscale.rangeBand())
      .attr("style", "fill:#4682b4")
      .attr("height", function (d) { return height - yscale(d.value); });



    if (isScrollDisplayed) {
      var xOverview = d3.scale.ordinal()
        .domain(data.map(function (d) { return d.label; }))
        .rangeBands([0, width], .2);
      yOverview = d3.scale.linear().range([heightOverview, 0]);
      yOverview.domain(yscale.domain());

      var subBars = diagram.selectAll('.subBar')
        .data(data)

      subBars.enter().append("rect")
        .classed('subBar', true)
        .attr({
          height: function (d) {
            return heightOverview - yOverview(d.value);
          },
          width: function (d) {
            return xOverview.rangeBand()
          },
          x: function (d) {

            return xOverview(d.label);
          },
          y: function (d) {
            return height + heightOverview + yOverview(d.value)
          }
        }).attr("style", "fill:#CCC")

      var displayed = d3.scale.quantize()
        .domain([0, width])
        .range(d3.range(data.length));

      diagram.append("rect")
        .attr("transform", "translate(0, " + (height + margin.bottom) + ")")
        .attr("class", "mover")
        .attr("x", 0)
        .attr("y", 0)
        .attr("height", selectorHeight)
        .attr("width", Math.round(parseFloat((numBars * width).toString()) / data.length))
        .attr("pointer-events", "all")
        .attr("cursor", "ew-resize").attr("style", " stroke: red;stroke-opacity: .1; fill: lightSteelBlue;fill-opacity: .5;")
        .call(d3.behavior.drag().on("drag", display));
    }
    function display() {
      var x = parseInt(d3.select(this).attr("x")),
        nx = x + d3.event.dx,
        w = parseInt(d3.select(this).attr("width")),
        f, nf, new_data, rects;

      if (nx < 0 || nx + w > width) return;

      d3.select(this).attr("x", nx);

      f = displayed(x);
      nf = displayed(nx);

      if (f === nf) return;

      new_data = data.slice(nf, nf + numBars);

      xscale.domain(new_data.map(function (d) { return d.label; }));
      diagram.select(".x.axis").call(xAxis);

      rects = bars.selectAll("rect")
        .data(new_data, function (d) { return d.label; });

      rects.attr("x", function (d) { return xscale(d.label); });

      // 	  rects.attr("transform", function(d) { return "translate(" + xscale(d.label) + ",0)"; })

      rects.enter().append("rect")
        .attr("class", "bar")
        .attr("x", function (d) { return xscale(d.label); })
        .attr("y", function (d) { return yscale(d.value); })
        .attr("width", xscale.rangeBand())
        .attr("height", function (d) { return height - yscale(d.value); })
        .attr("style", "fill:#4682b4");

      rects.exit().remove();
    };
  }
   groupBy(list, keyGetter) {
    const map = new Map();
    list.forEach((item) => {
         const key = keyGetter(item);
         const collection = map.get(key);
         if (!collection) {
             map.set(key, [item]);
         } else {
             collection.push(item);
         }
    });
    return map;
}
handleChange(e)
{
  this.filterData();
}

}

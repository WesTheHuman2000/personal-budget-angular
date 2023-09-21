import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Chart } from 'chart.js';

@Component({
  selector: 'pb-d3pie',
  templateUrl: './d3pie.component.html',
  styleUrls: ['./d3pie.component.scss']
})
export class D3pieComponent implements OnInit {
  private svg: any;
  private margin = 50;
  private width = 750;
  private height = 600;
  // The radius of the pie chart is half the smallest side
  private radius = Math.min(this.width, this.height) / 2 - this.margin;
  private colors: any;
  //private data: any[] = [];
  budgetData: any[] = [];

  constructor(private http: HttpClient){}
  public dataSource = {
    datasets: [{
        data: [30, 350, 90],
        backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
],
}],


    labels: [
        'Eat out',
        'Rent',
        'Groceries'
    ]
    };
    data = [
      {"Framework": "Vue", "Stars": "166443", "Released": "2014"},
      {"Framework": "React", "Stars": "150793", "Released": "2013"},
      {"Framework": "Angular", "Stars": "62342", "Released": "2016"},
      {"Framework": "Backbone", "Stars": "27647", "Released": "2010"},
      {"Framework": "Ember", "Stars": "21471", "Released": "2011"},
    ];

  ngOnInit(): void{

    this.http.get('http://localhost:3000/budget')
    .subscribe((res: any) =>
    {
      this.budgetData = res.budget.myBudget;
      const budgetTableLoop = res.budget.myBudget;
      console.log('from d3'+budgetTableLoop);
      for(var i =0; i < budgetTableLoop.length; i++){
        this.dataSource.datasets[0].data[i]=budgetTableLoop[i].budget;
        this.dataSource.labels[i] = budgetTableLoop[i].title;

      }
//      this.data = budgetData;
    console.log(budgetTableLoop);
    this.createSvg();
    this.createColors();
    this.drawChart();
    console.log(this.data +'from d3');
    console.log(this.data );
    });

  }

    //init chart

    private createSvg(): void {
      this.svg = d3.select("figure#pie")
      .append("svg")
      .attr("width", this.width)
      .attr("height", this.height)
      .append("g")
      .attr(
        "transform",
        "translate(" + this.width / 2 + "," + this.height / 2 + ")"
      );
  }

  private createColors(): void {
    this.colors = d3.scaleOrdinal()
    .domain(this.budgetData.map((item) => item.title.toString()))
    .range(["#c7d3ec", "#a5b8db", "#879cc4", "#677795", "#5a6782"]);
}
private drawChart(): void {
  // Compute the position of each group on the pie:
  const pie = d3.pie<any>().value((d: any) => Number(d.budget));

  // Build the pie chart
  this.svg
  .selectAll('pieces')
  .data(pie(this.budgetData))
  .enter()
  .append('path')
  .attr('d', d3.arc()
    .innerRadius(0)
    .outerRadius(this.radius)
  )
  .attr('fill', (d: any, i: any) => (this.colors(i)))
  .attr("stroke", "#121926")
  .style("stroke-width", "1px");

  // Add labels
  const labelLocation = d3.arc()
  .innerRadius(100)
  .outerRadius(this.radius);

  this.svg
  .selectAll('pieces')
  .data(pie(this.budgetData))
  .enter()
  .append('text')
  .text((d: any) => d.data.title)
  .attr("transform", (d: any) => "translate(" + labelLocation.centroid(d) + ")")
  .style("text-anchor", "middle")
  .style("font-size", 15);
}


}

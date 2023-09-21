import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Chart } from 'chart.js';
import * as d3 from 'd3';
import * as d3Scale from 'd3-scale'; // For scales
import * as d3Shape from 'd3-shape'; // For layout functions



@Component({
  selector: 'pb-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent {
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

  constructor(private http: HttpClient){}

  ngOnInit(): void{
    this.http.get('http://localhost:3000/budget')
    .subscribe((res: any) =>
    {

      const budgetData = res.budget.myBudget;
      console.log(budgetData);
      for(var i =0; i < budgetData.length; i++){

        this.dataSource.datasets[0].data[i]=budgetData[i].budget;
        this.dataSource.labels[i] = budgetData[i].title;
        this.createChart();
    }
    console.log('from chartjs'+budgetData);

    });
  }

  createChart() {
   // var ctx = document.getElementById('myChart').getContext('2d');
    var ctx = document.getElementById('myChart') as HTMLCanvasElement;
    var myPieChart = new Chart(ctx, {
        type:'pie',
        data: this.dataSource
    });
}

//end of code
};


import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {AgWordCloudData} from "angular4-word-cloud";

@Component({
    selector: 'app-wordcloud',
    templateUrl: './wordcloud.component.html',
    styleUrls: ['./wordcloud.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class WordcloudComponent implements OnInit {

    //The colors specified for our word cloud
    colors: Array<String> = [
        'blue',
        'green',
        'orange',
        'brown',
        'black',
        'gray',
        'cyan',
        'yellow'
    ];

    wordData: Array<AgWordCloudData> = [
        {text: "This", size: 12},
        {text: "Is", size: 13},
        {text: "A", size: 14},
        {text: "Test", size: 15},
        {text: "Word", size: 16},
        {text: "Cloud", size: 17},
        {text: "Stuff", size: 18},
        {text: "More", size: 19},
        {text: "Things", size: 20},
        {text: "Yes", size: 21},
        {text: "Jakob", size: 22},
        {text: "Daniel", size: 23},
        {text: "MH", size: 24},
        {text: "Marius", size: 25},
        {text: "Fredrik", size: 26},
    ];

    options = {
        settings: {
            minFontSize: 10,
            maxFontSize: 100,
        },
        margin: {
            top: 10,
            right: 10,
            bottom: 10,
            left: 10
        },
        labels: false // false to hide hover labels
    };

    constructor() {
    }

    ngOnInit() {
    }

}

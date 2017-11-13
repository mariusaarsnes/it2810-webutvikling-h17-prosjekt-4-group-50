import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {AgWordCloudData} from "angular4-word-cloud";
import {SearchService} from "../search-result/search.service";
import {GenresResponse} from "../../interfaces/genres-response.interface";

@Component({
    selector: 'wordcloud',
    templateUrl: './wordcloud.component.html',
    styleUrls: ['./wordcloud.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class WordcloudComponent implements OnInit {

    loaded: boolean = true;

    //The colors specified for our word cloud
    colors: Array<String> = [
        'blue',
        'green',
        'orange',
        'brown',
        'black',
        'gray',
        'cyan',
    ];

    wordData: Array<AgWordCloudData>;

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

    constructor(private searchService: SearchService) {
    }

    ngOnInit() {
        this.searchService.getFavoriteGenres().subscribe(data => {
            this.wordData = this.mapGenresToWordCloud(data);
            this.loaded = true;
        });
    }

    mapGenresToWordCloud(data: GenresResponse[]): Array<AgWordCloudData> {
        return data.map(genre => {
            return <AgWordCloudData>{text: genre._id, size: genre.count}
        });
    }

}

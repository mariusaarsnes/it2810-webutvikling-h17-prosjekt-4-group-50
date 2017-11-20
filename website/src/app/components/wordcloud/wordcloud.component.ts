import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {AgWordCloudData} from 'angular4-word-cloud';
import {DataService} from '../../data.service';
import {GenresResponse} from '../../interfaces/genres-response.interface';

@Component({
    selector: 'wordcloud',
    templateUrl: './wordcloud.component.html',
    styleUrls: ['./wordcloud.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class WordcloudComponent implements OnInit {

    loaded = false;

    // The colors specified for our word cloud
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
            minFontSize: 20,
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

    constructor(private searchService: DataService) {
    }

    ngOnInit() {
        this.searchService.getFavoriteGenres().subscribe(data => {
            this.wordData = this.mapGenresToWordCloud(data);
            this.loaded = true;
        });

    }

    mapGenresToWordCloud(data: GenresResponse[]): Array<AgWordCloudData> {
        return data.map((genre, index) => {
            return <AgWordCloudData>{text: genre._id, size: index == 0 ? genre.count + 2 : genre.count};
        });
    }

}

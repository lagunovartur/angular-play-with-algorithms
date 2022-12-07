import {Component, OnInit, ViewChild} from '@angular/core';
import {delay, from, interval, map, of, take} from "rxjs";

@Component({
  selector: 'app-sort-n2',
  templateUrl: './sort-n2.component.html',
  styleUrls: ['./sort-n2.component.scss']
})
export class SortN2Component implements OnInit {

  private _speed:number=0.1

  private _length:number=10

  private _max:number=10

  private _min:number=0

  public array:Array<number>=[]
  private colorMap = new Map();

  constructor() { }

  ngOnInit(): void {
    this._updateArray()
  }

  public get max(){
    return this._max
  }

  public set max(value:number){
    this._max=value
    this._updateArray()
  }

  public get min(){
    return this._min
  }

  public set min(value:number){
    this._min=value
    this._updateArray()
  }

  public get speed(){
    return this._speed;
  }

  public set speed(value:number){
    this._speed = value;
  }

  public get length(){
    return this._length;
  }

  public set length(value:number){
    this._length = value
    this._updateArray()
  }


  private _updateArray(){
    this.array=SortN2Component._randomArray(this.length,this._min,this.max);
    this.colorMap.clear();
  }


  onSort(){
    const log = SortN2Component.getBubleSortLog(this.array.slice());
    this._applySortLog(log);
  }

  public getItemColor(index:number):string{
    let color;
    color=this.colorMap.get(index);
    if (color){
      return color;
    }
    else {
      color=SortN2Component._randomColor();
      this.colorMap.set(index,color);
      return color;
    }
  }

  private _applySortLog(log:any){

    interval(this._speed*1000).pipe(take(log.length)).subscribe(
      idx=>{
        this._swap(log[idx][0],log[idx][1]);
      }
    )

  }

  private _swap(xp:number,yp:number){
    SortN2Component._swap(this.array,xp,yp);
    let tmp=this.colorMap.get(xp);
    this.colorMap.set(xp,this.colorMap.get(yp));
    this.colorMap.set(yp,tmp);
  }

  public static getBubleSortLog(arr:Array<number>){

    let log = [];
    let n = arr.length;
    for (let i=0; i < n-1; i++){
      for (let j=0; j<n-i-1;j++){
        if (arr[j]>arr[j+1]){
            SortN2Component._swap(arr, j, j + 1)
            log.push([j,j+1]);
        }
      }
    }
    return log;

  }

  private static _swap(arr:Array<number>, xp:number, yp:number){
    const tmp = arr[xp];
    arr[xp]=arr[yp];
    arr[yp]=tmp;
  }

  private static _randomColor():string{
    return "#"+Math.floor(Math.random()*16777215).toString(16);
  }

  private static _randomArray(count:number,min:number=0,max:number=10):Array<number>{
    return Array.from({length: count}, () => SortN2Component._randomInt(min,max));
  }

  private static _randomInt(min:number, max:number):number{
    return Math.floor(Math.random() * (max - min) + min);
  }

}

import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import * as _moment from 'moment';

@Component({
  selector: 'ngx-angular-time-picker',
  templateUrl: './ngx-angular-time-picker-lib.component.html',
  styleUrls: ['./ngx-angular-time-picker-lib.component.scss'],
})
export class NgxAngurlarTimePickerLibComponent implements OnInit {
  public hours: any[];
  public minutes: any[];
  public seconds: any[];
  public hide: boolean = true;
  //@ts-ignore
  @ViewChild('hourContainer') private hourContainer: ElementRef;
  //@ts-ignore
  @ViewChild('minuteContainer') private minuteContainer: ElementRef;
  //@ts-ignore
  @ViewChild('secondContainer') private secondContainer: ElementRef;
  public inside = false;
  public selectedHourIndex: any = 0;
  public selectedMinuteIndex: any = 0;
  public selectedSecondIndex: any = 0;
  public selectedAmPm: string = 'AM';
  public firstCells: any[] = [0, 1, 2, 3, 4];
  public lastHourCells: any[] = [19, 20, 21, 22, 23];
  public lastMinuteCells: any[] = [55, 56, 57, 58, 59];
  public patch = false;

  @Input('control')
  public control: any;

  @Input('top')
  public top: string = '0px';

  @Input('left')
  public left: string = '0px';

  @Input('enableSecond')
  public enableSecond: boolean = false;

  @Input('format')
  public format: string = '24hr';

  @Input('backgroundColorCell')
  public backgroundColorCell: string = '#00b6ff';

  @Input('backgroundColorCellHover')
  public backgroundColorCellHover: string = '#b0e8ff';

  public show: boolean = false;

  public width: number = 100;

  public aMpMHoverStatus = {
    am: {
      hover: false,
    },
    pm: {
      hover: false,
    },
  };

  @Output()
  public onTimeChange = new EventEmitter<any>();

  constructor() {
    this.hours = this.generateCells(24);
    this.minutes = this.generateCells(60);
    this.seconds = this.generateCells(60);
  }

  ngOnInit(): void {
    let format12hr = this.enableSecond ? 'hh:mm:ss A' : 'hh:mm A';
    let format24hr = this.enableSecond ? 'HH:mm:ss' : 'HH:mm';
    if (this.control.value.split(' ').length > 1) {
      if (this.format !== '12hr') {
        this.control.patchValue(
          _moment(this.control.value, [format12hr]).format(format24hr)
        );
      } else {
        this.control.patchValue(
          _moment(this.control.value, [format12hr]).format(format12hr)
        );
      }
    } else {
      if (this.format === '12hr') {
        this.control.patchValue(
          _moment(this.control.value, [format24hr]).format(format12hr)
        );
      } else {
        this.control.patchValue(
          _moment(this.control.value, [format24hr]).format(format24hr)
        );
      }
    }
    if (this.format === '12hr') {
      this.hours = [
        ...this.generateCells(12).splice(1),
        { active: false, time: '12', hover: false },
      ];
      this.lastHourCells = [7, 8, 9, 10, 11];
      this.width += 50;
    }
    if (this.enableSecond) {
      this.width += 50;
    }

    if (this.control.value && this.control.value.split(':').length > 0) {
      this.selectedHourIndex =
        this.format === '12hr'
          ? this.control.value.split(':')[0] - 1
          : this.control.value.split(':')[0];
      this.selectedMinuteIndex = _moment(this.control.value, [
        this.format === '12hr' ? format12hr : format24hr,
      ]).format('mm');
      if (this.enableSecond && this.control.value.split(':').length > 2) {
        this.selectedSecondIndex = _moment(this.control.value, [
          this.format === '12hr' ? format12hr : format24hr,
        ]).format('ss');
      }
      if (this.format === '12hr') {
        this.selectedAmPm = _moment(this.control.value, [
          this.format === '12hr' ? format12hr : format24hr,
        ])
          .format('A')
          .toUpperCase();
      }
      this.patch = true;
    }
    this.selectHour(parseInt(this.selectedHourIndex), this.patch);
    this.selectMinute(parseInt(this.selectedMinuteIndex), this.patch);
    if (this.enableSecond && this.control.value.split(':').length > 2) {
      this.selectSecond(parseInt(this.selectedSecondIndex), this.patch);
    }
    if (this.format === '12hr') {
      this.selectAmPm(this.selectedAmPm, this.patch);
    }
    this.show = true;
  }

  @HostListener('click')
  clicked() {
    this.inside = true;
  }

  @HostListener('document:click')
  clickedOut() {
    if (!this.inside) {
      this.hide = true;
    }
    this.inside = false;
  }

  onInputClick() {
    let tempHide = this.hide;
    this.hide = false;
    setTimeout(() => {
      if (tempHide != this.hide) {
        this.hourContainer.nativeElement.scrollTop =
          this.selectedHourIndex * 50 + 250;
        this.minuteContainer.nativeElement.scrollTop =
          this.selectedMinuteIndex * 50 + 250;

        if (this.enableSecond) {
          this.secondContainer.nativeElement.scrollTop =
            this.selectedSecondIndex * 50 + 250;
        }
      }
    }, 100);
  }

  generateCells(length: number): number[] {
    //@ts-ignore
    return Array.apply(null, { length })
      .map(Number.call, Number)
      .map((item, index) => {
        let cell = { active: false };
        //@ts-ignore
        if (item < 10) return { ...cell, time: `0${item}` };
        return { ...cell, time: `${item}`, hover: false };
      });
  }

  selectHour(i: number, patch: boolean = true) {
    let format12hr = this.enableSecond ? 'hh:mm:ss A' : 'hh:mm A';
    let format24hr = this.enableSecond ? 'HH:mm:ss' : 'HH:mm';

    if (patch) {
      this.selectedHourIndex = i;
      this.hours = this.hours.map((hour, index) => {
        hour.active = index === i;
        let minute = '00';
        if (this.control.value && this.control.value.split(':').length > 0) {
          minute = _moment(this.control.value, [
            this.format === '12hr' ? format12hr : format24hr,
          ]).format('mm');
        }
        let time = `${hour.time}:${minute}`;
        if (this.enableSecond) {
          let second = '00';
          if (this.control.value && this.control.value.split(':').length > 2) {
            second = `${
              this.format === '12hr'
                ? this.control.value.split(':')[2].split(' ')[0]
                : this.control.value.split(':')[2]
            }`;
          }
          time += `:${second}`;
        }
        if (index === i) {
          if (this.format === '12hr') {
            time += ` ${this.selectedAmPm}`;
          }
          this.outputTime(`${time}`);
        }
        return hour;
      });
    }
  }

  selectMinute(i: number, patch: boolean = true) {
    if (patch) {
      this.selectedMinuteIndex = i;
      this.minutes = this.minutes.map((minute, index) => {
        minute.active = index === i;
        let hour = '00';
        if (this.control.value && this.control.value.split(':').length > 0) {
          hour = `${this.control.value.split(':')[0]}`;
        }
        let time = `${hour}:${minute.time}`;
        if (this.enableSecond) {
          let second = '00';
          if (this.control.value && this.control.value.split(':').length > 2) {
            second = `${
              this.format === '12hr'
                ? this.control.value.split(':')[2].split(' ')[0]
                : this.control.value.split(':')[2]
            }`;
          }
          time += `:${second}`;
        }
        if (index === i) {
          if (this.format === '12hr') {
            time += ` ${this.selectedAmPm}`;
          }
          this.outputTime(`${time}`);
        }
        return minute;
      });
    }
  }

  selectSecond(i: number, patch: boolean = true) {
    if (patch) {
      this.selectedSecondIndex = i;
      this.seconds = this.seconds.map((second, index) => {
        second.active = index === i;
        let hour = '00';
        if (this.control.value && this.control.value.split(':').length > 0) {
          hour = `${this.control.value.split(':')[0]}`;
        }
        let minute = '00';
        if (this.control.value && this.control.value.split(':').length > 0) {
          minute = `${this.control.value.split(':')[1]}`;
        }
        let time = `${hour}:${minute}`;
        if (index === i) {
          time += `:${second.time}`;
          if (this.format === '12hr') {
            time += ` ${this.selectedAmPm}`;
          }
          this.outputTime(`${time}`);
        }
        return second;
      });
    }
  }

  selectAmPm(aMpM: string, patch: boolean = true) {
    let format12hr = this.enableSecond ? 'hh:mm:ss A' : 'hh:mm A';
    let format24hr = this.enableSecond ? 'HH:mm:ss' : 'HH:mm';

    if (patch) {
      this.selectedAmPm = aMpM;
      let hour = '00';
      if (this.control.value && this.control.value.split(':').length > 0) {
        hour = _moment(this.control.value, [
          this.format === '12hr' ? format12hr : format24hr,
        ]).format(this.format === '12hr' ? 'hh' : 'HH');
      }
      let minute = '00';
      if (this.control.value && this.control.value.split(':').length > 0) {
        minute = _moment(this.control.value, [
          this.format === '12hr' ? format12hr : format24hr,
        ]).format('mm');
      }
      let time = `${hour}:${minute}`;
      if (this.enableSecond) {
        let second = '00';
        if (this.control.value && this.control.value.split(':').length > 2) {
          second = `${
            this.format === '12hr'
              ? this.control.value.split(':')[2].split(' ')[0]
              : this.control.value.split(':')[2]
          }`;
        }
        time += `:${second}`;
      }
      this.outputTime(`${time} ${this.selectedAmPm}`);
    }
  }

  activeAmPm(aMpM: string) {
    return this.selectedAmPm == aMpM;
  }

  //@ts-ignore
  onScrollLoopCheck(e, section) {
    if (e.target.offsetHeight + e.target.scrollTop >= e.target.scrollHeight) {
      if (section == 'hour') this.hourContainer.nativeElement.scrollTop = 251;
      if (section == 'minute')
        this.minuteContainer.nativeElement.scrollTop = 251;
      if (section == 'second')
        this.secondContainer.nativeElement.scrollTop = 251;
    }
    if (e.target.scrollTop == 0) {
      if (section == 'hour')
        this.hourContainer.nativeElement.scrollTop =
          e.target.scrollHeight - 501;
      if (section == 'minute')
        this.minuteContainer.nativeElement.scrollTop =
          e.target.scrollHeight - 501;
      if (section == 'second')
        this.secondContainer.nativeElement.scrollTop =
          e.target.scrollHeight - 501;
    }
  }

  arrowTicker(delta: number, section: String) {
    if (section === 'hour') {
      this.hourContainer.nativeElement.scrollTop =
        this.hourContainer.nativeElement.scrollTop + delta;
    } else if (section === 'minute') {
      this.minuteContainer.nativeElement.scrollTop =
        this.minuteContainer.nativeElement.scrollTop + delta;
    } else if (section === 'second') {
      this.secondContainer.nativeElement.scrollTop =
        this.secondContainer.nativeElement.scrollTop + delta;
    }
  }

  outputTime(time: string) {
    this.control.patchValue(time);
    let output: any = {};
    let format12hr = this.enableSecond ? 'hh:mm:ss A' : 'hh:mm A';
    let format24hr = this.enableSecond ? 'HH:mm:ss' : 'HH:mm';
    if (this.format === '12hr') {
      output = {
        ...output,
        '12hr': time,
        '24hr': _moment(time, [format12hr]).format(format24hr),
      };
    } else {
      output = {
        ...output,
        '12hr': _moment(time, [format24hr]).format(format12hr),
        '24hr': time,
      };
    }
    this.onTimeChange.emit(output);
  }
}

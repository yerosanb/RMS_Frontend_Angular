import { formatDate } from '@angular/common';
import {
  Component,
  OnInit,
  QueryList,
  Renderer2,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { NgToastService } from 'ng-angular-popup';
import { LocalStorageService } from 'ngx-webstorage';
import { ReconcileService } from 'src/app/User/services/reconcile.service';
import { AuthService } from 'src/app/services/auth-service.service';
import { UtilService } from 'src/app/services/util-service/util.service';
import Swal from 'sweetalert2';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { ReconViewService } from 'src/app/User/services/recon-view.service';
import { IssueAccountService } from 'src/app/User/c/components/issue_account/services/issue-account.service';
import { FixedViewService } from 'src/app/FixedAsset/garama/services/fixed-view.service';
@Component({
  selector: 'app-view-removed',
  templateUrl: './view-removed.component.html',
  styleUrls: ['./view-removed.component.css']
})
export class ViewRemovedComponent implements OnInit {

  @ViewChildren(DataTableDirective)
  dtElements!: QueryList<DataTableDirective>;

  dt_ats_current_page: number = 0;

  @ViewChild('SwalSessionExpired')
  public readonly SwalSessionExpired!: SwalComponent;

  dtOptions_mms_waiting: any;
  matchId: string = '';
  selections: number = 0;
  initialMinDateValue = new Date();
  initialMaxDateValue = new Date();
  reload_checker: boolean = true;
  //core inits
  mms_waiting_first_column_title = '-ID-';
  mms_waiting_second_column_title = 'Category';
  mms_waiting_third_column_title = ' grn_date';
  mms_waiting_fourth_column_title = 'main_pg';
  mms_waiting_fifth_column_title = 'Removed date';
  mms_waiting_sixth_column_title = 'asset code';
  mms_waiting_seventh_column_title = 'Tag number';
  mms_waiting_eighth_column_title = 'Quantity';
  mms_waiting_ninth_column_title = 'Assetdescription';
  mms_waiting_tenth_column_title = 'created_by';
  mms_waiting_eleventh_column_title = 'Book_value';
  // mms_waiting_twelfth_column_title = 'Branch_name';
  mms_waiting_thirteenth_column_title = 'grv_number';
  mms_waiting_fourteenth_column_title = 'giv_number';
  mms_waiting_fifteenth_column_title = 'siv_date';
  // mms_waiting_sixteenth_column_title = ' Old main_pg';
  mms_waiting_input_0!: any;
  mms_waiting_input_1!: any;
  mms_waiting_input_2!: any;
  mms_waiting_input_3!: any;
  mms_waiting_input_4!: any;
  mms_waiting_input_5!: any;
  mms_waiting_input_6!: any;
  mms_waiting_input_7!: any;
  mms_waiting_input_8!: any;
  mms_waiting_input_9!: any;
  mms_waiting_input_10!: any;
  // mms_waiting_input_11!: any;
  mms_waiting_input_12!: any;
  mms_waiting_input_13!: any;
  mms_waiting_input_14!: any;
  // mms_waiting_input_15!: any;
  mms_waiting_first_column_id = '0';
  mms_waiting_second_column_id = '1';
  mms_waiting_third_column_id = '2';
  mms_waiting_fourth_column_id = '3';
  mms_waiting_fifth_column_id = '4';
  mms_waiting_sixth_column_id = '5';
  mms_waiting_seventh_column_id = '6';
  mms_waiting_eighth_column_id = '7';
  mms_waiting_ninth_column_id = '8';
  mms_waiting_tenth_column_id = '9';
  mms_waiting_eleventh_column_id = '10';
  // mms_waiting_twelfth_column_id = '11';
  mms_waiting_thirteenth_column_id = '12';
  mms_waiting_fourteenth_column_id = '13';
  mms_waiting_fifteenth_column_id = '14';
  // mms_waiting_sixteenth_column_id = '15';

  constructor(
    private router: Router,
    private utilService: UtilService,
    private authService: AuthService,
    private localStorageService: LocalStorageService,
    private fixedService: FixedViewService,
    private toast: NgToastService,
    private formBuilder: FormBuilder,
    private reconViewService: ReconViewService
  ) { }

  minDateChange(value: Date): void {
    this.initialMinDateValue = new Date(value);
    this.localStorageService.store('min_current_date_removed', this.initialMinDateValue);
    if (!this.reload_checker)
      this.dtElements.forEach(
        (dtElement: DataTableDirective, index: number) => {

          dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
            dtInstance.ajax.reload((data) => { }, false);
          });

        }
      );
    this.reload_checker = false;
  }
  maxDateChange(value: Date): void {
    this.initialMaxDateValue = new Date(value);
    this.localStorageService.store('max_current_date_removed', this.initialMaxDateValue);
    if (!this.reload_checker)
      this.dtElements.forEach(
        (dtElement: DataTableDirective, index: number) => {

          dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
            dtInstance.ajax.reload((data) => { }, false);
          });

        }
      );
    this.reload_checker = false;
  }
  ngOnInit() {

    if (this.localStorageService.retrieve('min_current_date_removed') == null) {
      this.initialMinDateValue = new Date();
      this.localStorageService.store(
        'min_current_date_removed',
        this.initialMinDateValue
      );
    } else
      this.initialMinDateValue = new Date(
        this.localStorageService.retrieve('min_current_date_removed')
      );

    if (this.localStorageService.retrieve('max_current_date_removed') == null) {
      this.initialMaxDateValue = new Date();
      this.localStorageService.store(
        'max_current_date_removed',
        this.initialMaxDateValue
      );
    } else
      this.initialMaxDateValue = new Date(
        this.localStorageService.retrieve('max_current_date_removed')
      );

    this.dtOptions_mms_waiting = {
      serverSide: false,
      scrollX: true,
      searching: true,
      // lengthMenu: 'ten',
      lengthChange: true,
      ordering: true,
      paging: true,
      // scrollY: 400,
      pagingType: 'full_numbers',
      pageLength: 10,
      lengthMenu: [5, 10, 20, 50, 100, 200, 500],
      select: true,
      // ajax: '../../../../assets/data/data.json',
      rowCallback: (row: Node, data: any[] | Object, index: number) => {
        const self = this;
        $('td', row).off('click');
        $('td', row).on('click', () => {
          // self.someFilterFromAts(data);
        });
        return row;
      },
      ajax: (dataTablesParameters: any, callback: any) => {
        this.fixedService
          .getMMMSRemoved(
            formatDate(this.initialMinDateValue, 'yyyy-MM-dd', 'en-US').toString(), formatDate(this.initialMaxDateValue, 'yyyy-MM-dd', 'en-US').toString()
          )
          .subscribe(
            async (resp: any) => {
              if (resp != null) {
                console.log(
                  'response for table: ' + JSON.stringify(resp, null, 2)
                );
                // data: resp
                callback({
                  recordsTotal: resp.recordsTotal,
                  recordsFiltered: resp.recordsFiltered,
                  data: resp,
                });
                console.log(
                  'records total: ' + JSON.stringify(resp.recordsTotal)
                );
              } else {
                Swal.fire({
                  icon: 'error',
                  title: 'Permission',
                  text: 'You are not permitted to perform this action!',
                });
              }
            },
            (error: any) => {
              if (error.error.text === 'access-token-expired') {
                console.log('Access-token-expired requesting refresh token...');
                if (
                  this.localStorageService.retrieve(
                    'refresh_token_requested'
                  ) == null
                ) {
                  this.utilService.refreshToken().subscribe(
                    (data) => {
                      if (data === true) {
                        console.log(
                          'refresh token success re-requesting the actual request'
                        );
                        this.localStorageService.clear(
                          'refresh_token_requested'
                        );
                        //================================================================================
                        this.fixedService
                          .getMMMSRemoved(
                            formatDate(this.initialMinDateValue, 'yyyy-MM-dd', 'en-US').toString(), formatDate(this.initialMaxDateValue, 'yyyy-MM-dd', 'en-US').toString()
                          )
                          .subscribe(
                            async (resp: any) => {
                              if (resp != null) {
                                console.log(
                                  'response for table: ' +
                                  JSON.stringify(resp, null, 2)
                                );
                                // data: resp
                                callback({
                                  recordsTotal: resp.recordsTotal,
                                  recordsFiltered: resp.recordsFiltered,
                                  data: resp,
                                });
                                console.log(
                                  'records total: ' +
                                  JSON.stringify(resp.recordsTotal)
                                );
                              } else {
                                Swal.fire({
                                  icon: 'error',
                                  title: 'Permission',
                                  text: 'You are not permitted to perform this action!',
                                });
                              }
                            },
                            (error: any) => {
                              if (error.error.text === 'access-token-expired') {
                                console.log('refresh token expired.');
                                this.SwalSessionExpired.fire();
                                this._refreshTokenExpired();
                              } else {
                                Swal.fire({
                                  icon: 'error',
                                  title: 'Oops...',
                                  text: 'Something went wrong!',
                                });
                                console.log(
                                  JSON.stringify(error.error.apierror, null, 2)
                                );
                              }
                            }
                          );
                        //================================================================================
                      } else {
                        console.log('refresh token expired.');
                        this.SwalSessionExpired.fire();
                        this._refreshTokenExpired();
                      }
                    },
                    (error: any) => {
                      console.log('error refreshing access token');
                      Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Something went wrong!',
                      });
                      console.log(
                        JSON.stringify(error.error.apierror, null, 2)
                      );
                    }
                  );
                  this.localStorageService.store(
                    'refresh_token_requested',
                    true
                  );
                }
              } else {
                Swal.fire({
                  icon: 'error',
                  title: 'Oops...',
                  text: 'Something went wrong!',
                });
                console.log(JSON.stringify(error.error.apierror, null, 2));
              }
            }
          );
      },
      columns: [
        {
          title: this.mms_waiting_first_column_title,
          data: 'id',
        },
        {
          title: this.mms_waiting_second_column_title,
          data: 'category',
        },
        {
          title: this.mms_waiting_third_column_title,
          data: 'grn_date',
        },
        {
          title: this.mms_waiting_fourth_column_title,
          data: 'main_pg',
        },
        {
          title: this.mms_waiting_fifth_column_title,
          data: 'removed_date',
        },
        {
          title: this.mms_waiting_sixth_column_title,
          data: 'asset_code',
        },
        {
          title: this.mms_waiting_seventh_column_title,
          data: 'tag_number',
        },
        {
          title: this.mms_waiting_eighth_column_title,
          data: 'quantity',
        },
        {
          title: this.mms_waiting_ninth_column_title,
          data: 'asset_description',
        },
        {
          title: this.mms_waiting_tenth_column_title,
          data: 'created_by',
        },
        {
          title: this.mms_waiting_eleventh_column_title,
          data: 'book_value',
        },
        // {
        //   title: this.mms_waiting_twelfth_column_title,
        //   data: 'branch_name',
        // },
        {
          title: this.mms_waiting_thirteenth_column_title,
          data: 'grv_number',
        },
        {
          title: this.mms_waiting_fourteenth_column_title,
          data: 'giv_number',
        },
        {
          title: this.mms_waiting_fifteenth_column_title,
          data: 'siv_date',
        },
        // {
        //   title: this.mms_waiting_sixteenth_column_title,
        //   data: 'old_main_pg',
        // },

      ],
      dom: "<'row mb-1 my-1'<'col-sm-5'l><'col-sm-7'f>><'row mb-1'B>rtip<'row mt-1'Q>",
      // dom: "<'row mb-1'Q><'row mb-1'<'col-sm-5'l><'col-sm-7'f>><'row mb-1'B>rtip<'row mb-1'P>",
      // colReorder: {
      //   order: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
      //   // fixedColumnsLeft: 1,
      //   action: function (e: any, dt: any, node: any, config: any) {},
      // },
      buttons: {
        buttons: [
          'colvis',
          ,
          // {
          //   extend: 'fixedColumns',
          //   text: 'FixedColumns',
          //   config: {
          //     left: 1,
          //   },
          // },
          {
            text: 'Reload',
            action: function (e: any, dt: any, node: any, config: any) {
              dt.ajax.reload();
              // alert('reload success');
            },
          },
          {
            extend: 'selected',
            text: 'Sum',
            action: async function (e: any, dt: any, node: any, config: any) {
              var rows = dt.rows({ selected: true }).data().toArray();
              if (rows.length < 2) {
                Swal.fire({
                  icon: 'warning',
                  text: 'Please select more than one row to sum up their amount.',
                });
              } else {
                var sum :number = 0;
                console.log('length----'+rows.length)
                for (let i = 0; i < rows.length; i++) {
                  sum += Number(rows[i].book_value);
                }
                Swal.fire({
                  text: 'The sum of selected amounts is ' +sum.toFixed(2)
                });
              }
            },
          },

          {
            extend: 'excel',
            text: 'Excel',
          },

          {
            extend: 'collection',
            text: 'Header',
            autoClose: true,
            background: true,
            dropup: false,
            collectionTitle: '',
            buttons: [
              {
                text: 'Enable fixed header',
                key: '1',
                action: function (e: any, dt: any, node: any, config: any) {
                  dt.fixedHeader.enable();
                },
              },
              {
                text: 'Disable fixed header',
                key: '1',
                action: function (e: any, dt: any, node: any, config: any) {
                  dt.fixedHeader.disable();
                },
              },
            ],
            fade: true,
          },
        ],
      },

      stateSave: true,
      stateDuration: 0,
      fixedFooter: true,
      fixedHeader: {
        header: true,
      },
      scrollCollapse: true,
      // searchPanes: {
      //   initCollapsed: true,
      //   cascadePanes: true,
      //   clear: true,
      // },
      columnDefs: [
        {
          targets: '_all',
          defaultContent: '-',
          // className: 'select-checkbox',
        },
        //   {
        //     searchPanes: {
        //       show: true,
        //     },
        //     targets: [0, 1, 4, 5, 8],
        //   },
        //   {
        //     searchPanes: {
        //       show: false,
        //     },
        //     targets: [2, 3, 6, 7, 9, 10, 11],
        //   },
      ],
      // language: {
      //   searchPanes: {
      //     count: '{total} found',
      //     countFiltered: '{shown} / {total}',
      //   },
      // },
    };
    this.clearAllSearches();
  }

  //FOOTER SEARCH AND BUTTON ON CLICK
  ngAfterViewInit(): void {
    var that = this;

    this.dtElements.forEach((dtElement: DataTableDirective, index: number) => {
      if (index == 0) {
        dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
          dtInstance.on('select', function (e, dt, type, indexes) {
            console.log('current page: ' + dt.page());
            that.dt_ats_current_page = dt.page();
            var rowData = dtInstance.rows(indexes).data().toArray();
            console.log(JSON.stringify(rowData[0].reference, null, 4));
            // this.selections ++

            // that.qbs_input_11 = that.matchId;
            that.dtElements.forEach(
              (dtElement: DataTableDirective, index: number) => {
                console.log('index: ' + index);
                if (index == 0) {
                  // console.log(info.reference);
                  // that.refAll = rowData[0].reference
                  that.selections++;
                  dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
                    // dtInstance.column(8).search(that.matchId).draw();
                  });
                  // that.count_ats_selected_data ++;
                  console.log('to search: ' + that.matchId);
                  console.log('selectionsssssssssssssssst: ' + that.selections);
                }
              }
            );
          });
          dtInstance.on('deselect', function (e, dt, type, indexes) {
            console.log('deselect');
            console.log('current page: ' + dt.page());
            // var rowData = dtInstance.rows( indexes ).data().toArray();
            // var events = ''
            // events = ( '<div><b>'+type+' <i>de</i>selection</b> - '+JSON.stringify( rowData )+'</div>' );
            // console.log('events: ' + events)
            console.log('selections: ' + that.selections);
            if (that.selections <= 1) {
              that.matchId = '';
              // that.ats_input_1 = '';
              that.clearAllSearches();
            } else that.selections--;
            // that.clearAllSearches();
            // dt.page(that.dt_ats_current_page).draw(false)
            console.log('done going to page.' + that.dt_ats_current_page);
          });
          dtInstance.columns().every(function () {
            $('input', this.footer()).on('keyup change', function () {
              if (this['id'] == '1') {
                if (
                  dtInstance.column(this['id']).search() !==
                  (this as HTMLInputElement).value
                ) {
                  that.matchId = (this as HTMLInputElement).value;
                  dtInstance.column(this['id']).search(that.matchId).draw();
                }
              } else {
                if (this['id'] != '') {
                  if (
                    dtInstance.column(this['id']).search() !==
                    (this as HTMLInputElement).value
                  ) {
                    dtInstance
                      .column(this['id'])
                      .search((this as HTMLInputElement).value)
                      .draw();
                  }
                }
              }
            });
          });
          dtInstance.on(
            'draw stateRestore-change',
            function (e, settings, details) {
              var c = 0;

            }
          );

          dtInstance.on('column-reorder', function (e, settings, details) {
            var c = 0;

          });
        });
      } else if (index == 1) {

      }
    });
    that.clearAllSearches();
    console.log('selectionsssssssssssssssssssss: ' + that.selections);
  }
  clearAllSearches() {

    if (this.dtElements != null && this.dtElements.length > 0)
      this.dtElements.forEach((dtElement: DataTableDirective, index: number) => {
        if (index == 0) {
          dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
            dtInstance.rows('.selected').deselect();
            for (let i = 0; i < dtInstance.columns().count(); i++) {
              dtInstance.column(i).search("");
              if (i < dtInstance.columns().count()) {
                continue;
              }
            }
            dtInstance.draw();

            dtInstance.page(this.dt_ats_current_page).draw(false);
          });
        } else {
          dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
            dtInstance.rows('.selected').deselect();
            for (let i = 0; i < dtInstance.columns().count(); i++) {
              dtInstance.column(i).search("");
              if (i < dtInstance.columns().count()) {
                continue;
              }
            }
            dtInstance.draw();
          });
        }
      });
  }

  _refreshTokenExpired() {
    console.log('logging out');

    this.authService.clearCookies().subscribe(
      (data) => {
        if (data) {
          console.log(data);
          delay(3500);
          this.router.navigateByUrl('/login');
          this.localStorageService.clear('user');
          this.localStorageService.clear('roles');
        } else {
          console.log('login failed 001');
        }
      },
      (error) => {
        console.log(
          'Error: ' + JSON.stringify(error.error.apierror.message, null, 2)
        );
      }
    );
  }
}
function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

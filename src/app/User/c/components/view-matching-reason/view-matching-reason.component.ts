import { formatDate } from '@angular/common';
import { Component, QueryList, Renderer2, ViewChild, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { NgToastService } from 'ng-angular-popup';
import { LocalStorageService } from 'ngx-webstorage';
import { ReconViewService } from 'src/app/User/services/recon-view.service';
import { UtilService } from 'src/app/services/util-service/util.service';
import Swal from 'sweetalert2';
import { ReconcileService } from '../../../services/reconcile.service';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { AuthService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-view-matching-reason',
  templateUrl: './view-matching-reason.component.html',
  styleUrls: ['./view-matching-reason.component.css']
})
export class ViewMatchingReasonComponent {
  @ViewChild('SwalSessionExpired')
  public readonly SwalSessionExpired!: SwalComponent;

  @ViewChildren(DataTableDirective)
  dtElements!: QueryList<DataTableDirective>;

  initialDateValue = new Date();

  reload_checker: boolean = true;

  dtOptions_ats: any;
  dtOptions_core: any;

  //ats inits
  ats_first_column_title = '-ID-';
  ats_second_column_title = 'Reference';
  ats_third_column_title = 'Amount';
  ats_fourth_column_title = 'Value Date-type';
  ats_fifth_column_title = 'Sender';
  ats_sixth_column_title = 'Receiver';
  ats_seventh_column_title = 'Type';
  ats_eighth_column_title = 'Upload Date';
  ats_ninth_column_title = 'Additional Information';
  ats_tenth_column_title = 'Match Id';
  ats_eleventh_column_title = 'Match date';
  ats_tewelefth_column_title = 'Matched by';

  ats_input_0!: any;
  ats_input_1!: any;
  ats_input_2!: any;
  ats_input_3!: any;
  ats_input_4!: any;
  ats_input_5!: any;
  ats_input_6!: any;
  ats_input_7!: any;
  ats_input_8!: any;
  ats_input_9!: any;
  ats_input_10!: any;
  ats_input_11!: any;

  ats_first_column_id = '0';
  ats_second_column_id = '1';
  ats_third_column_id = '2';
  ats_fourth_column_id = '3';
  ats_fifth_column_id = '4';
  ats_sixth_column_id = '5';
  ats_seventh_column_id = '6';
  ats_eighth_column_id = '7';
  ats_ninth_column_id = '8';
  ats_tenth_column_id = '9';
  ats_eleventh_column_id = '10';
  ats_tewelfth_column_id = '11';
  //core inits
  core_first_column_title = '-ID-';
  core_second_column_title = 'Add..-Info';
  core_third_column_title = 'Amount';
  core_fourth_column_title = 'Value Date';
  core_fifth_column_title = 'Upload Date';
  core_sixth_column_title = 'Branch Code';
  core_seventh_column_title = 'Type';
  core_eighth_column_title = 'Posting Date';
  core_ninth_column_title = 'Transaction Reference';
  core_tenth_column_title = 'Match Id';
  core_eleventh_column_title = 'Match date';
  core_tewelefth_column_title = 'Matched by';

  core_input_0!: any;
  core_input_1!: any;
  core_input_2!: any;
  core_input_3!: any;
  core_input_4!: any;
  core_input_5!: any;
  core_input_6!: any;
  core_input_7!: any;
  core_input_8!: any;
  core_input_10!: any;
  core_input_12!: any;

  core_first_column_id = '0';
  core_second_column_id = '1';
  core_third_column_id = '2';
  core_fourth_column_id = '3';
  core_fifth_column_id = '4';
  core_sixth_column_id = '5';
  core_seventh_column_id = '6';
  core_eighth_column_id = '7';
  core_ninth_column_id = '8';
  core_tenth_column_id = '9';
  core_eleventh_column_id = '10';
  core_tewelfth_column_id = '11';


  // dtElement!: DataTableDirective;
  // dtInstance!: Promise<DataTables.Api>;

  matchId: string = '';
  selections: number = 0;
  dt_ats_current_page: number = 0;

  constructor(
    private renderer: Renderer2,
    private router: Router,
    private utilService: UtilService,
    private localStorageService: LocalStorageService,
    private reconViewService: ReconViewService,
    private toast: NgToastService,
    private authService: AuthService,
    private reconcileService:ReconcileService
  ) {}

  someFilterFromAts(info: any): void {}

  onReconDateChange(value: Date): void {
    this.initialDateValue = new Date(value);
    this.localStorageService.store('matched_current_date', this.initialDateValue);
    if (!this.reload_checker)
      this.dtElements.forEach(
        (dtElement: DataTableDirective, index: number) => {
          
            dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
              dtInstance.ajax.reload((data) => {}, false);
            });
          
        }
      );
    this.reload_checker = false;
  }

  ngOnInit(): void {
    if (this.localStorageService.retrieve('matched_current_date') == null) {
      this.initialDateValue = new Date();
      this.localStorageService.store(
        'matched_current_date',
        this.initialDateValue
      );
    } else
      this.initialDateValue = new Date(
        this.localStorageService.retrieve('matched_current_date')
      );
    try {
      this.dtOptions_ats = {
        serverSide: false,
        scrollX: true,
        searching: true,
        // lengthMenu: 'ten',
        lengthChange: true,
        ordering: true,
        paging: true,
        // scrollY: 400,
        pagingType: 'full_numbers',
        pageLength: 7,
        select: true,
        // ajax: '../../../../assets/data/data.json',
        rowCallback: (row: Node, data: any[] | Object, index: number) => {
          const self = this;
          $('td', row).off('click');
          $('td', row).on('click', () => {
            self.someFilterFromAts(data);
          });
          return row;
        },
        ajax: (dataTablesParameters: any, callback: any) => {
          this.reconcileService
            .getAllAtsMatchWithReason(formatDate(this.initialDateValue, 'yyyy-MM-dd', 'en-US'))
            .subscribe(
              async (resp: any) => {
                console.log(
                  'table1 ==========>: ' + JSON.stringify(resp, null, 2)
                );
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
                  console.log(
                    'Access-token-expired requesting refresh token...'
                  );
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
                          this.reconcileService
                          .getAllAtsMatchWithReason(
                              formatDate(
                                this.initialDateValue,
                                'yyyy-MM-dd',
                                'en-US'
                              )
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
                                if (
                                  error.error.text === 'access-token-expired'
                                ) {
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
                                    JSON.stringify(
                                      error.error.apierror,
                                      null,
                                      2
                                    )
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
            title: this.ats_first_column_title,
            data: 'id',
          },
          {
            title: this.ats_second_column_title,
            data: 'reference',
          },
          {
            title: this.ats_third_column_title,
            data: 'amount',
          },
          {
            title: this.ats_fourth_column_title,
            data: 'value_date_type',
          },
          {
            title: this.ats_fifth_column_title,
            data: 'sender',
          },
          {
            title: this.ats_sixth_column_title,
            data: 'receiver',
          },
          {
            title: this.ats_seventh_column_title,
            data: 'dr_cr',
          },
          {
            title: this.ats_eighth_column_title,
            data: 'upload_date',
          },
          {
            title: this.ats_ninth_column_title,
            data: 'additional_information',
          },
          {
            title: this.ats_tenth_column_title,
            data: 'match_id',
          },
          {
            title: this.ats_eleventh_column_title,
            data: 'match_date',
          },
          {
            title: this. ats_tewelefth_column_title,
            render: function (data: any, type: any, full: any) {
              
             return (full.firstname +" " + full.lastname)

           },
          },

          {
            title: 'Reason',
            data: 'reason',
          },
          // {
          //   title: this.ats_tenth_column_title,
          //   render: function (data: any, type: any, full: any) {
          //     document
          //      .getElementsByClassName('datatable-buttons')[0]
          //      ?.classList.remove('dt-button');
          //     if (full.status == 1)
          //    return '<button class="btn btn-primary">Active</button>';

          //     return '<span class="badge bg-danger rounded-pill">Inactive</span>';
          //  },
          // },
        ],
        dom: "<'row mb-1 my-1'<'col-sm-5'l><'col-sm-7'f>><'row mb-1'B>rtip<'row mt-1'Q>",
        // dom: "<'row mb-1'Q><'row mb-1'<'col-sm-5'l><'col-sm-7'f>><'row mb-1'B>rtip<'row mb-1'P>",
        colReorder: {
          order: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
          // fixedColumnsLeft: 1,
          action: function (e: any, dt: any, node: any, config: any) {},
        },
        buttons: {
          buttons: [
            'colvis',
            ,
       
            'print',
            {
              extend: 'pdf',
              text: 'Pdf',
            },
       
            {
              extend: 'excel',
              text: 'Excel',
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
      // console.log('height of navbar: ' + $('#navbar-custom-id_').outerHeight);
    } catch (ex) {
      console.log('Exception: ' + JSON.stringify(ex));
    }
    try {
      this.dtOptions_core = {
        serverSide: false,
        scrollX: true,
        searching: true,
        // lengthMenu: 'ten',
        lengthChange: true,
        ordering: true,
        paging: true,
        // scrollY: 400,
        pagingType: 'full_numbers',
        pageLength: 7,
        select: false,
        // ajax: '../../../../assets/data/data.json',
        ajax: (dataTablesParameters: any, callback: any) => {
          this.reconcileService.getAllCoreMatchWithReason(formatDate(this.initialDateValue, 'yyyy-MM-dd', 'en-US')).subscribe(
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
                        this.reconcileService.getAllCoreMatchWithReason(formatDate(this.initialDateValue, 'yyyy-MM-dd', 'en-US')).subscribe(
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
            title: this.core_first_column_title,
            data: 'id',
          },
          {
            title: this.core_second_column_title,
            data: 'additional_information',
          },
          {
            title: this.core_third_column_title,
            data: 'amount',
          },
          {
            title: this.core_fourth_column_title,
            data: 'value_date',
          },
          {
            title: this.core_fifth_column_title,
            data: 'upload_date',
          },
          {
            title: this.core_sixth_column_title,
            data: 'branch_code',
          },
          {
            title: this.core_seventh_column_title,
            data: 'dr_cr',
          },
          {
            title: this.core_eighth_column_title,
            data: 'posting_date',
          },
          {
            title: this.core_ninth_column_title,
            data: 'transaction_reference',
          },
          {
            title: this.core_tenth_column_title,
            data: 'match_id',
          },
          {
            title: this.core_eleventh_column_title,
            data: 'match_date',
          },
          {
            title: this.core_tewelefth_column_title,
            render: function (data: any, type: any, full: any) {
              
              return (full.firstname +" " + full.lastname)
            },
          },
          {
            title: 'Reason',
            data: 'reason',
          },
          // {
          //   title: this.core_tenth_column_title,
          //   render: function (data: any, type: any, full: any) {
          //     document
          //       .getElementsByClassName('datatable-buttons')[0]
          //       ?.classList.remove('dt-button');
          //     // if (full.status == 1)
          //     return '<button class="btn btn-primary">Active</button>';

          //     // return '<span class="badge bg-danger rounded-pill">Inactive</span>';
          //   },
          // },
        ],
        dom: "<'row mb-1'<'col-sm-5'l><'col-sm-7'f>><'row mb-1'B>rtip<'row mt-2'Q>",
        // dom: "<'row mb-1'Q><'row mb-1'<'col-sm-5'l><'col-sm-7'f>><'row mb-1'B>rtip<'row mb-1'P>",
        colReorder: {
          order: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
          // fixedColumnsLeft: 1,
          action: function (e: any, dt: any, node: any, config: any) {},
        },
        buttons: {
          buttons: [
            'colvis',
            ,
      
         
            'print',
            {
              extend: 'pdf',
              text: 'Pdf',
            },
        
            {
              extend: 'excel',
              text: 'Excel',
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
      // console.log('height of navbar: ' + $('#navbar-custom-id_').outerHeight);
    } catch (ex) {
      console.log('Exception: ' + JSON.stringify(ex));
    }
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
            that.matchId = rowData[0].match_id;
            that.ats_input_9 = that.matchId;
            that.dtElements.forEach(
              (dtElement: DataTableDirective, index: number) => {
                console.log('index: ' + index);
                if (index == 0) {
                  // console.log(info.reference);
                  // that.refAll = rowData[0].reference
                  that.selections++;
                  dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
                    dtInstance
                      .column(9)
                      .search(
                        that.matchId
                          .split(' ')[0]
                          .replace('"', '')
                          .substring(1, that.matchId.length - 1)
                      )
                      .draw();
                  });
                  console.log('to search: ' + that.matchId);
                  console.log('selectionsssssssssssssssst: ' + that.selections);
                } else {
                  dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
                    dtInstance;
                    dtInstance
                      .column(9)
                      .search(
                        that.matchId
                          .split(' ')[0]
                          .replace('"', '')
                          .substring(1, that.matchId.length - 1)
                      )
                      .draw();
                  });
                  console.log(' searched...');
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
              that.ats_input_1 = '';
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
              for (let col of settings.aoColumns) {
                if (col.title == that.ats_first_column_title) {
                  that.ats_first_column_id = c.toString();
                } else if (col.title == that.ats_second_column_title) {
                  that.ats_second_column_id = c.toString();
                } else if (col.title == that.ats_third_column_title) {
                  that.ats_third_column_id = c.toString();
                } else if (col.title == that.ats_fourth_column_title) {
                  that.ats_fourth_column_id = c.toString();
                } else if (col.title == that.ats_fifth_column_title) {
                  that.ats_fifth_column_id = c.toString();
                } else if (col.title == that.ats_sixth_column_title) {
                  that.ats_sixth_column_id = c.toString();
                } else if (col.title == that.ats_seventh_column_title) {
                  that.ats_seventh_column_id = c.toString();
                } else if (col.title == that.ats_eighth_column_title) {
                  that.ats_eighth_column_id = c.toString();
                } else if (col.title == that.ats_ninth_column_title) {
                  that.ats_ninth_column_id = c.toString();
                } else if (col.title == that.ats_tenth_column_title) {
                  that.ats_tenth_column_id = c.toString();
                }
                c++;
              }
            }
          );

          dtInstance.on('column-reorder', function (e, settings, details) {
            var c = 0;
            for (let col of settings.aoColumns) {
              if (col.title == that.ats_first_column_title) {
                that.ats_first_column_id = c.toString();
              } else if (col.title == that.ats_second_column_title) {
                that.ats_second_column_id = c.toString();
              } else if (col.title == that.ats_third_column_title) {
                that.ats_third_column_id = c.toString();
              } else if (col.title == that.ats_fourth_column_title) {
                that.ats_fourth_column_id = c.toString();
              } else if (col.title == that.ats_fifth_column_title) {
                that.ats_fifth_column_id = c.toString();
              } else if (col.title == that.ats_sixth_column_title) {
                that.ats_sixth_column_id = c.toString();
              } else if (col.title == that.ats_seventh_column_title) {
                that.ats_seventh_column_id = c.toString();
              } else if (col.title == that.ats_eighth_column_title) {
                that.ats_eighth_column_id = c.toString();
              } else if (col.title == that.ats_ninth_column_title) {
                that.ats_ninth_column_id = c.toString();
              } else if (col.title == that.ats_tenth_column_title) {
                that.ats_tenth_column_id = c.toString();
              }
              c++;
            }
          });
        });
      } else if (index == 1) {
        // dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        //   dtInstance.columns().every(function () {
        //     $('input', this.footer()).on('keyup change', function () {
        //       if (this['id'] == '1') {
        //         if (
        //           dtInstance.column(this['id']).search() !==
        //           (this as HTMLInputElement).value
        //         ) {
        //           that.refAll = (this as HTMLInputElement).value;
        //           dtInstance.column(this['id']).search(that.refAll).draw();
        //         }
        //       } else {
        //         if (this['id'] != '') {
        //           if (
        //             dtInstance.column(this['id']).search() !==
        //             (this as HTMLInputElement).value
        //           ) {
        //             dtInstance
        //               .column(this['id'])
        //               .search((this as HTMLInputElement).value)
        //               .draw();
        //           }
        //         }
        //       }
        //     });
        //   });
        //   dtInstance.on(
        //     'draw stateRestore-change',
        //     function (e, settings, details) {
        //       var c = 0;
        //       for (let col of settings.aoColumns) {
        //         if (col.title == that.ats_first_column_title) {
        //           that.ats_first_column_id = c.toString();
        //         } else if (col.title == that.ats_second_column_title) {
        //           that.ats_second_column_id = c.toString();
        //         } else if (col.title == that.ats_third_column_title) {
        //           that.ats_third_column_id = c.toString();
        //         } else if (col.title == that.ats_fourth_column_title) {
        //           that.ats_fourth_column_id = c.toString();
        //         } else if (col.title == that.ats_fifth_column_title) {
        //           that.ats_fifth_column_id = c.toString();
        //         } else if (col.title == that.ats_sixth_column_title) {
        //           that.ats_sixth_column_id = c.toString();
        //         } else if (col.title == that.ats_seventh_column_title) {
        //           that.ats_seventh_column_id = c.toString();
        //         } else if (col.title == that.ats_eighth_column_title) {
        //           that.ats_eighth_column_id = c.toString();
        //         } else if (col.title == that.ats_ninth_column_title) {
        //           that.ats_ninth_column_id = c.toString();
        //         } else if (col.title == that.ats_tenth_column_title) {
        //           that.ats_tenth_column_id = c.toString();
        //         }
        //         c++;
        //       }
        //     }
        //   );
        //   dtInstance.on('column-reorder', function (e, settings, details) {
        //     var c = 0;
        //     for (let col of settings.aoColumns) {
        //       if (col.title == that.ats_first_column_title) {
        //         that.ats_first_column_id = c.toString();
        //       } else if (col.title == that.ats_second_column_title) {
        //         that.ats_second_column_id = c.toString();
        //       } else if (col.title == that.ats_third_column_title) {
        //         that.ats_third_column_id = c.toString();
        //       } else if (col.title == that.ats_fourth_column_title) {
        //         that.ats_fourth_column_id = c.toString();
        //       } else if (col.title == that.ats_fifth_column_title) {
        //         that.ats_fifth_column_id = c.toString();
        //       } else if (col.title == that.ats_sixth_column_title) {
        //         that.ats_sixth_column_id = c.toString();
        //       } else if (col.title == that.ats_seventh_column_title) {
        //         that.ats_seventh_column_id = c.toString();
        //       } else if (col.title == that.ats_eighth_column_title) {
        //         that.ats_eighth_column_id = c.toString();
        //       } else if (col.title == that.ats_ninth_column_title) {
        //         that.ats_ninth_column_id = c.toString();
        //       } else if (col.title == that.ats_tenth_column_title) {
        //         that.ats_tenth_column_id = c.toString();
        //       }
        //       c++;
        //     }
        //   });
        // });
      }
    });
    that.clearAllSearches();
    console.log('selectionsssssssssssssssssssss: ' + that.selections);
  }
  clearAllSearches() {
    this.dtElements.forEach((dtElement: DataTableDirective, index: number) => {
      console.log('index: ' + index);
      if (index == 0) {
        dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
          dtInstance.rows('.selected').deselect();
          // dtInstance.search('').draw()
          dtInstance
            .search('')
            .column(0)
            .search('')
            .column(1)
            .search('')
            .column(2)
            .search('')
            .column(3)
            .search('')
            .column(4)
            .search('')
            .column(5)
            .search('')
            .column(6)
            .search('')
            .column(7)
            .search('')
            .column(8)
            .search('')
            .column(9)
            .search('')
            .draw();
          // dtInstance.search('').draw()
          dtInstance.page(this.dt_ats_current_page).draw(false);
        });
      } else {
        dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
          dtInstance.rows('.selected').deselect();
          dtInstance
            .search('')
            .column(0)
            .search('')
            .column(1)
            .search('')
            .column(2)
            .search('')
            .column(3)
            .search('')
            .column(4)
            .search('')
            .column(5)
            .search('')
            .column(6)
            .search('')
            .column(7)
            .search('')
            .column(8)
            .search('')
            .column(9)
            .search('')
            .draw();
        });
      }
    })
  }
  UnmatchTransactions() {
    var data_1_id: any[] = [];
    var data_2_id: any[] = [];
    var data_1_amount_sum: number = 0;
    var data_2_amount_sum: number = 0;
    this.dtElements.forEach((dtElement: DataTableDirective, index: number) => {
      if (index == 0) {
        dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
          var rowData = dtInstance.rows({ search: 'applied' }).data().toArray();
          for (let i = 0; i < rowData.length; i++) {
            // data_1.push(rowData[i])
            // console.log(JSON.stringify(rowData[i], null, 4))
            // console.log('amount: ' + JSON.stringify(rowData[i].amount, null, 4))
            data_1_amount_sum += Number(
              JSON.stringify(rowData[i].amount, null, 4)
            );
            data_1_id.push(rowData[i].id);
            // data_1_id.push(rowData[i].id)
            // data_1_id.push(rowData[i].id)
            // data_1_id.push(rowData[i].id)
          }
        });
      } else {
        dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
          var rowData = dtInstance.rows({ search: 'applied' }).data().toArray();
          for (let i = 0; i < rowData.length; i++) {
            // data_2.push(rowData[i])
            data_2_amount_sum += Number(
              JSON.stringify(rowData[i].amount, null, 4)
            );
            data_2_id.push(rowData[i].id);
            // data_2_id.push(rowData[i].id)
          }
          console.log(this.selections)
          if(this.selections > 0){
          if (data_1_amount_sum != data_2_amount_sum) {
            Swal.fire({
              title: 'Amount Difference: ',
              text: 'It seems there is an amount difference between the selected transactions. Do you want to match them as Partial?',
              icon: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#0acf97',
              cancelButtonColor: '#3085d6',
              confirmButtonText: 'Partial match',
            }).then((result) => {
              if (result.isConfirmed) {
                console.log('partial match');
                // const sw = Swal.fire({
                //   title: 'Please wait !',
                //   allowOutsideClick: false,
                //   // timer: 4000,
                //   showConfirmButton: false,
                //   showCancelButton: false,
                //   showCloseButton: false,
                //   showDenyButton: false,
                //   didOpen: () => {
                //     Swal.showLoading(Swal.getDenyButton()!);
                //   },

                // this.datatableElement.dtInstance.then(
                //   (dtInstance: DataTables.Api) => {
                //     dtInstance.ajax.reload((data) => {
                //       // alert(data);
                //       Swal.hideLoading();
                //       Swal.close();
                //       Swal.fire({
                //         icon: 'success',
                //         title: 'Success',
                //         text: 'User deleted successfully!',
                //       });
                //     }, false);
                //   }
                // );
              } else {
                console.log('canceled');
              }
            });
          }
          //  else {
          //   console.log(data_1_id);
          //   console.log(data_2_id);
          //   this.reconcileService
          //     .unmatchTransactions(data_1_id.toString(), data_2_id.toString())
          //     .subscribe(
          //       (data: any) => {
          //         if (data == true) {
          //           this.showMatchSuccess();
          //           this.dtElements.forEach(
          //             (dtElement: DataTableDirective, index: number) => {
          //               console.log('index: ' + index);
          //               if (index == 0) {
          //                 dtElement.dtInstance.then(
          //                   (dtInstance: DataTables.Api) => {
          //                     dtInstance
          //                       .rows({ search: 'applied' })
          //                       .remove()
          //                       .draw();
          //                   }
          //                 );
                        
          //               }
          //              else if (index == 1) {
          //                 dtElement.dtInstance.then(
          //                   (dtInstance: DataTables.Api) => {
          //                     dtInstance
          //                       .rows({ search: 'applied' })
          //                       .remove()
          //                       .draw();
          //                   }
          //                 );
          //                 this.clearAllSearches();
          //               }
          //               // else {
          //               //   // dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
          //               //   //   dtInstance.rows({ search: 'applied' }).remove().draw();
          //               //   // });
          //               //   this.clearAllSearches();
          //               // }
          //             }
          //           );
          //           console.log('match success: ' + data);
          //         } else console.log('ret: ' + JSON.stringify(data, null, 5));
          //       },
          //       (error: any) => {
          //         console.log('ret: ' + JSON.stringify(error, null, 5));
          //       }
          //     );
          // }
        }else{
          this.showSelectionEmpty()
        }
        });
      }
    });
    // for(let i = 0; i<data_1.length; i++){
    //   data_1_amount_sum += Number(JSON.stringify(data_1[i].amount, null, 4))
    // }
    // for(let i = 0; i<data_2.length; i++){
    //   data_2_amount_sum += Number(JSON.stringify(data_2[i].amount, null, 4))
    // }
  }
  showMatchSuccess() {
    this.toast.success({ detail: 'SUCCESS', summary: 'UnMatched successfully!' });
  }
  showSelectionEmpty() {
    this.toast.error({ detail: 'ERROR', summary: 'Please select transaction to UnMatch.' });
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
// dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
//   dtInstance.page(this.dt_ats_current_page).draw(false)
// });


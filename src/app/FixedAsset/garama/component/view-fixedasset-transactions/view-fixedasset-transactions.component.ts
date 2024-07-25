import { formatDate } from '@angular/common';
import { Component, QueryList, Renderer2, ViewChild, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { DataTableDirective } from 'angular-datatables';
import { NgToastService } from 'ng-angular-popup';
import { LocalStorageService } from 'ngx-webstorage';
import { AuthService } from 'src/app/services/auth-service.service';
import { UtilService } from 'src/app/services/util-service/util.service';
import { ReconViewService } from 'src/app/User/services/recon-view.service';
import { ReconcileService } from 'src/app/User/services/reconcile.service';
import Swal from 'sweetalert2';
import { FixedReconAutomaticService } from '../../services/fixed-recon-automatic.service';
@Component({
  selector: 'app-view-fixedasset-transactions',
  templateUrl: './view-fixedasset-transactions.component.html',
  styleUrls: ['./view-fixedasset-transactions.component.css']
})
export class ViewFixedassetTransactionsComponent {
  @ViewChildren(DataTableDirective)
  dtElements!: QueryList<DataTableDirective>;

  @ViewChild('SwalSessionExpired')
  public readonly SwalSessionExpired!: SwalComponent;

  initialDateValue = new Date();
  reload_checker: boolean = true;
  dtOptions_mms: any;
  dtOptions_core: any;

  //mms inits
  mms_first_column_title = '-ID-';
  mms_second_column_title = 'Reference';
  mms_third_column_title = 'Store Code';
  mms_fourth_column_title = 'Stock Account Segment';
  mms_fifth_column_title = 'Transaction Date';
  mms_sixth_column_title = 'Posting Date';
  mms_seventh_column_title = 'Additional Info..';
  mms_eighth_column_title = 'Period';
  mms_ninth_column_title = 'Debit';
  mms_tenth_column_title = 'Credit';
  mms_twelveth_column_title = 'Transaction Code';
  mms_eleventh_column_title = 'bbf';
  mms_thirteenth_column_title = 'Main PG';
  mms_fourteenth_column_title = 'Store Name';
  mms_fifteenth_column_title = 'Category Desc..';
  mms_sixteenth_column_title = 'Match Id';
  mms_seventeenth_column_title = 'Match date';
  mms_eighteenth_column_title = 'Matched by';

  mms_input_0!: any;
  mms_input_1!: any;
  mms_input_2!: any;
  mms_input_3!: any;
  mms_input_4!: any;
  mms_input_5!: any;
  mms_input_6!: any;
  mms_input_7!: any;
  mms_input_8!: any;
  mms_input_9!: any;
  mms_input_10!: any;
  mms_input_11!: any;
  mms_input_12!: any;
  mms_input_13!: any;
  mms_input_14!: any;
  mms_input_15!: any;
  mms_input_16!: any;
  mms_input_17!: any;
  mms_input_18!: any;

  mms_first_column_id = '0';
  mms_second_column_id = '1';
  mms_third_column_id = '2';
  mms_fourth_column_id = '3';
  mms_fifth_column_id = '4';
  mms_sixth_column_id = '5';
  mms_seventh_column_id = '6';
  mms_eighth_column_id = '7';
  mms_ninth_column_id = '8';
  mms_tenth_column_id = '9';
  mms_eleventh_column_id = '10';
  mms_twelevth_column_id = '11';
  mms_thirteenth_column_id = '12';
  mms_fourteenth_column_id = '13';
  mms_fifteenth_column_id = '14';
  mms_sixteenth_column_id = '12';
  mms_seventeenth_column_id = '13';
  mms_eighteenth_column_id = '14';


  //core inits
 //core inits
 core_first_column_title = '-ID-';
 core_second_column_title = 'Account Number';
 core_third_column_title = 'Transaction Date';
 core_fourth_column_title = 'Posting Date';
 core_fifth_column_title = 'Value Date';
 core_sixth_column_title = 'Credit';
 core_seventh_column_title = 'Debit';
 core_eighth_column_title = 'Branch Code';
 core_ninth_column_title = 'Reference';
 core_tenth_column_title = 'Narration';
 core_eleventh_column_title = 'Account Description';
 core_twelveth_column_title = 'Account Name';
 core_thirteenth_column_title = 'Match Id';
 core_fourteenth_column_title = 'Match date';
 core_fifteenth_column_title = 'Matched by';

  core_input_0!: any;
  core_input_1!: any;
  core_input_2!: any;
  core_input_3!: any;
  core_input_4!: any;
  core_input_5!: any;
  core_input_6!: any;
  core_input_7!: any;
  core_input_8!: any;
  core_input_9!: any;
  core_input_10!: any;
  core_input_11!: any;
  core_input_12!: any;
  core_input_13!: any;
  core_input_14!: any;

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
  core_twelveth_column_id = '11';
  core_thirteenth_column_id = '13';
  core_fourteenth_column_id = '14';
  core_fifteenth_column_id = '15';

  // dtElement!: DataTableDirective;
  // dtInstance!: Promise<DataTables.Api>;

  matchId: string = '';
  selections: number = 0;
  dt_mms_current_page: number = 0;
  count_mms_selected_data: number = 0;
  count_core_selected_data: number = 0
  constructor(
    private renderer: Renderer2,
    private router: Router,
    private utilService: UtilService,
    private localStorageService: LocalStorageService,
    private autoReconFixedService: FixedReconAutomaticService,
    private reconViewService: ReconViewService,
    private toast: NgToastService,
    private authService: AuthService
  ) { }

  someFilterFromAts(info: any): void { }

  onReconDateChange(value: Date): void {
    this.initialDateValue = new Date(value);
    this.localStorageService.store('matched_current_date', this.initialDateValue);
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
      this.dtOptions_mms = {
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
        lengthMenu: [5, 10, 20, 50, 100, 200, 500],

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
          this.autoReconFixedService
          .getFixedMMSForView(formatDate(this.initialDateValue, 'yyyy-MM-dd', 'en-US'))
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
                          this.autoReconFixedService
                          .getFixedMMSForView(
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
            title: this.mms_first_column_title,
            data: 'id',
          },
          {
            title: this.mms_second_column_title,
            data: 'reference',
          },
          {
            title: this.mms_third_column_title,
            data: 'store_code',
          },
          {
            title: this.mms_fourth_column_title,
            data: 'stock_account_segment',
          },
          {
            title: this.mms_fifth_column_title,
            data: 'transaction_date',
          },
          // {
          //   title: this.mms_sixth_column_title,
          //   data: 'posting_date',
          // },
          {
            title: this.mms_seventh_column_title,
            data: 'additional_information',
          },
          {
            title: this.mms_eighth_column_title,
            data: 'period',
          },
          {
            title: this.mms_ninth_column_title,
            data: 'debit',
          },
          {
            title: this.mms_tenth_column_title,
            data: 'credit',
          },
          {
            title: this.mms_eleventh_column_title,
            data: 'bbf',
          },
          {
            title: this.mms_twelveth_column_title,
            data: 'tran_code',
          },
          {
            title: this.mms_thirteenth_column_title,
            data: 'main_pg',
          },
          {
            title: this.mms_fourteenth_column_title,
            data: 'store_name',
          },
          {
            title: this.mms_fifteenth_column_title,
            data: 'category_description',
          },
          {
            title: this.mms_sixteenth_column_title,
            data: 'match_id',
          },
          {
            title: this.mms_seventeenth_column_title,
            data: 'match_date',
          },
          {
            title: this.mms_eighteenth_column_title,
            render: function (data: any, type: any, full: any) {

              return (full.firstname + " " + full.lastname)

            },
          },
        ],
        dom: "<'row mb-1 my-1'<'col-sm-5'l><'col-sm-7'f>><'row mb-1'B>rtip<'row mt-1'Q>",
        // dom: "<'row mb-1'Q><'row mb-1'<'col-sm-5'l><'col-sm-7'f>><'row mb-1'B>rtip<'row mb-1'P>",
        colReorder: {
          order: [0, 1, 2, 3, 4, 5, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18],
          // fixedColumnsLeft: 1,
          action: function (e: any, dt: any, node: any, config: any) { },
        },
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
              extend: 'copy',
              text: '<u>C</u>opy',
              key: {
                key: 'c',
                altKey: true,
              },
            },
            'print',
            {
              extend: 'pdf',
              text: 'Pdf',
            },
            {
              extend: 'pdf',
              text: 'Pdf current page',
              exportOptions: {
                modifier: {
                  page: 'current',
                },
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
        select: true,
        lengthMenu: [5, 10, 20, 50, 100, 200, 500],
        // ajax: '../../../../assets/data/data.json',
        ajax: (dataTablesParameters: any, callback: any) => {
          this.autoReconFixedService.getFixedCoreForView(formatDate(this.initialDateValue, 'yyyy-MM-dd', 'en-US')).subscribe(
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
                        this.autoReconFixedService.getFixedCoreForView(formatDate(this.initialDateValue, 'yyyy-MM-dd', 'en-US')).subscribe(
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
            data: 'account_number',
          },
          {
            title: this.core_third_column_title,
            data: 'transaction_date',
          },
          {
            title: this.core_fourth_column_title,
            data: 'posting_date',
          },
          {
            title: this.core_fifth_column_title,
            data: 'value_date',
          },
          {
            title: this.core_sixth_column_title,
            data: 'credit',
          },
          {
            title: this.core_seventh_column_title,
            data: 'debit',
          },
          {
            title: this.core_eighth_column_title,
            data: 'branch_code',
          },
          {
            title: this.core_ninth_column_title,
            data: 'reference',
          },
          {
            title: this.core_tenth_column_title,
            data: 'naration',
          },
          {
            title: this.core_eleventh_column_title,
            data: 'account_description',
          },
          {
            title: this.core_twelveth_column_title,
            data: 'account_name',
          },
          {
            title: this.core_thirteenth_column_title,
            data: 'match_id',
          },
          {
            title: this.core_fourteenth_column_title,
            data: 'match_date',
          },
          {
            title: this.core_fifteenth_column_title,
            render: function (data: any, type: any, full: any) {

              return (full.firstname + " " + full.lastname)
            },
          },
        ],
        dom: "<'row mb-1 my-1'<'col-sm-5'l><'col-sm-7'f>><'row mb-1'B>rtip<'row mt-1'Q>",

        // dom: "<'row mb-1'Q><'row mb-1'<'col-sm-5'l><'col-sm-7'f>><'row mb-1'B>rtip<'row mb-1'P>",
        colReorder: {
          order: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9,10,11,12,13,14,15],
          // fixedColumnsLeft: 1,
          action: function (e: any, dt: any, node: any, config: any) { },
        },
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
              extend: 'copy',
              text: '<u>C</u>opy',
              key: {
                key: 'c',
                altKey: true,
              },
            },
            'print',
            {
              extend: 'pdf',
              text: 'Pdf',
            },
            {
              extend: 'pdf',
              text: 'Pdf current page',
              exportOptions: {
                modifier: {
                  page: 'current',
                },
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
            that.dt_mms_current_page = dt.page();
            var rowData = dtInstance.rows(indexes).data().toArray();
            console.log(JSON.stringify(rowData[0].reference, null, 4));
            // this.selections ++

            that.matchId = rowData[0].match_id;
            that.mms_input_15 = that.matchId;
            that.dtElements.forEach(
              (dtElement: DataTableDirective, index: number) => {
                console.log('index: ' + index);
                if (index == 0) {
                  // console.log(info.reference);
                  // that.refAll = rowData[0].reference
                  that.selections++;
                  dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
                    dtInstance
                      .column(14)
                      .search(
                        that.matchId
                          .split(' ')[0]
                          .replace('"', '')
                          .substring(1, that.matchId.length - 1)
                      )
                      .draw();
                  });
                  that.count_mms_selected_data++;
                  console.log('to search: ' + that.matchId);
                  console.log('selectionsssssssssssssssst: ' + that.selections);
                } else {
                  dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
                    dtInstance;
                    dtInstance
                      .column(12)
                      .search(
                        that.matchId
                          .split(' ')[0]
                          .replace('"', '')
                          .substring(1, that.matchId.length - 1)
                      )
                      .draw();
                  });
                  console.log(' searched...');
                  that.count_core_selected_data++;
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
              that.mms_input_1 = '';
              that.clearAllSearches();
            } else that.selections--;
            // that.clearAllSearches();
            // dt.page(that.dt_ats_current_page).draw(false)
            console.log('done going to page.' + that.dt_mms_current_page);
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
                if (col.title == that.mms_first_column_title) {
                  that.mms_first_column_id = c.toString();
                } else if (col.title == that.mms_second_column_title) {
                  that.mms_second_column_id = c.toString();
                } else if (col.title == that.mms_third_column_title) {
                  that.mms_third_column_id = c.toString();
                } else if (col.title == that.mms_fourth_column_title) {
                  that.mms_fourth_column_id = c.toString();
                } else if (col.title == that.mms_fifth_column_title) {
                  that.mms_fifth_column_id = c.toString();
                }
                // else if (col.title == that.mms_sixth_column_title) {
                //   that.mms_sixth_column_id = c.toString();
                // }
                else if (col.title == that.mms_seventh_column_title) {
                  that.mms_seventh_column_id = c.toString();
                } else if (col.title == that.mms_eighth_column_title) {
                  that.mms_eighth_column_id = c.toString();
                } else if (col.title == that.mms_ninth_column_title) {
                  that.mms_ninth_column_id = c.toString();
                } else if (col.title == that.mms_tenth_column_title) {
                  that.mms_tenth_column_id = c.toString();
                }
                else if (col.title == that.mms_eleventh_column_title) {
                  that.mms_tenth_column_id = c.toString();
                } else if (col.title == that.mms_twelveth_column_title) {
                  that.mms_eleventh_column_id = c.toString();
                } else if (col.title == that.mms_thirteenth_column_title) {
                  that.mms_twelevth_column_id = c.toString();
                }
                else if (col.title == that.mms_fourteenth_column_title) {
                  that.mms_thirteenth_column_id = c.toString();
                } else if (col.title == that.mms_fifteenth_column_title) {
                  that.mms_fourteenth_column_id = c.toString();
                }else if (col.title == that.mms_sixteenth_column_title) {
                  that.mms_fifteenth_column_id = c.toString();
                }else if (col.title == that.mms_seventeenth_column_title) {
                  that.mms_sixteenth_column_id = c.toString();
                }else if (col.title == that.mms_eighteenth_column_title) {
                  that.mms_seventeenth_column_id = c.toString();
                }
                c++;
              }
            }
          );

          dtInstance.on('column-reorder', function (e, settings, details) {
            var c = 0;
            for (let col of settings.aoColumns) {
              if (col.title == that.mms_first_column_title) {
                that.mms_first_column_id = c.toString();
              } else if (col.title == that.mms_second_column_title) {
                that.mms_second_column_id = c.toString();
              } else if (col.title == that.mms_third_column_title) {
                that.mms_third_column_id = c.toString();
              } else if (col.title == that.mms_fourth_column_title) {
                that.mms_fourth_column_id = c.toString();
              } else if (col.title == that.mms_fifth_column_title) {
                that.mms_fifth_column_id = c.toString();
              }
              // else if (col.title == that.mms_sixth_column_title) {
              //   that.mms_sixth_column_id = c.toString();
              // }
              else if (col.title == that.mms_seventh_column_title) {
                that.mms_seventh_column_id = c.toString();
              } else if (col.title == that.mms_eighth_column_title) {
                that.mms_eighth_column_id = c.toString();
              } else if (col.title == that.mms_ninth_column_title) {
                that.mms_ninth_column_id = c.toString();
              } else if (col.title == that.mms_tenth_column_title) {
                that.mms_tenth_column_id = c.toString();
              }
              else if (col.title == that.mms_eleventh_column_title) {
                that.mms_tenth_column_id = c.toString();
              } else if (col.title == that.mms_twelveth_column_title) {
                that.mms_eleventh_column_id = c.toString();
              } else if (col.title == that.mms_thirteenth_column_title) {
                that.mms_twelevth_column_id = c.toString();
              }
              else if (col.title == that.mms_fourteenth_column_title) {
                that.mms_thirteenth_column_id = c.toString();
              } else if (col.title == that.mms_fifteenth_column_title) {
                that.mms_fourteenth_column_id = c.toString();
              }else if (col.title == that.mms_sixteenth_column_title) {
                that.mms_fifteenth_column_id = c.toString();
              }else if (col.title == that.mms_seventeenth_column_title) {
                that.mms_sixteenth_column_id = c.toString();
              }else if (col.title == that.mms_eighteenth_column_title) {
                that.mms_seventeenth_column_id = c.toString();
              }
              c++;
            }
          });
        });
      } else if (index == 1) {
        dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
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
                if (col.title == that.mms_first_column_title) {
                  that.mms_first_column_id = c.toString();
                } else if (col.title == that.mms_second_column_title) {
                  that.mms_second_column_id = c.toString();
                } else if (col.title == that.mms_third_column_title) {
                  that.mms_third_column_id = c.toString();
                } else if (col.title == that.mms_fourth_column_title) {
                  that.mms_fourth_column_id = c.toString();
                } else if (col.title == that.mms_fifth_column_title) {
                  that.mms_fifth_column_id = c.toString();
                }
                // else if (col.title == that.mms_sixth_column_title) {
                //   that.mms_sixth_column_id = c.toString();
                // }
                else if (col.title == that.mms_seventh_column_title) {
                  that.mms_seventh_column_id = c.toString();
                } else if (col.title == that.mms_eighth_column_title) {
                  that.mms_eighth_column_id = c.toString();
                } else if (col.title == that.mms_ninth_column_title) {
                  that.mms_ninth_column_id = c.toString();
                } else if (col.title == that.mms_tenth_column_title) {
                  that.mms_tenth_column_id = c.toString();
                }
                else if (col.title == that.mms_eleventh_column_title) {
                  that.mms_tenth_column_id = c.toString();
                } else if (col.title == that.mms_twelveth_column_title) {
                  that.mms_eleventh_column_id = c.toString();
                } else if (col.title == that.mms_thirteenth_column_title) {
                  that.mms_twelevth_column_id = c.toString();
                }
                else if (col.title == that.mms_fourteenth_column_title) {
                  that.mms_thirteenth_column_id = c.toString();
                } else if (col.title == that.mms_fifteenth_column_title) {
                  that.mms_fourteenth_column_id = c.toString();
                }else if (col.title == that.mms_sixteenth_column_title) {
                  that.mms_fifteenth_column_id = c.toString();
                }else if (col.title == that.mms_seventeenth_column_title) {
                  that.mms_sixteenth_column_id = c.toString();
                }else if (col.title == that.mms_eighteenth_column_title) {
                  that.mms_seventeenth_column_id = c.toString();
                }
                c++;
              }
            }
          );
          dtInstance.on('column-reorder', function (e, settings, details) {
            var c = 0;
            for (let col of settings.aoColumns) {
              if (col.title == that.mms_first_column_title) {
                that.mms_first_column_id = c.toString();
              } else if (col.title == that.mms_second_column_title) {
                that.mms_second_column_id = c.toString();
              } else if (col.title == that.mms_third_column_title) {
                that.mms_third_column_id = c.toString();
              } else if (col.title == that.mms_fourth_column_title) {
                that.mms_fourth_column_id = c.toString();
              } else if (col.title == that.mms_fifth_column_title) {
                that.mms_fifth_column_id = c.toString();
              }
              // else if (col.title == that.mms_sixth_column_title) {
              //   that.mms_sixth_column_id = c.toString();
              // }
              else if (col.title == that.mms_seventh_column_title) {
                that.mms_seventh_column_id = c.toString();
              } else if (col.title == that.mms_eighth_column_title) {
                that.mms_eighth_column_id = c.toString();
              } else if (col.title == that.mms_ninth_column_title) {
                that.mms_ninth_column_id = c.toString();
              } else if (col.title == that.mms_tenth_column_title) {
                that.mms_tenth_column_id = c.toString();
              }
              else if (col.title == that.mms_eleventh_column_title) {
                that.mms_tenth_column_id = c.toString();
              } else if (col.title == that.mms_twelveth_column_title) {
                that.mms_eleventh_column_id = c.toString();
              } else if (col.title == that.mms_thirteenth_column_title) {
                that.mms_twelevth_column_id = c.toString();
              }
              else if (col.title == that.mms_fourteenth_column_title) {
                that.mms_thirteenth_column_id = c.toString();
              } else if (col.title == that.mms_fifteenth_column_title) {
                that.mms_fourteenth_column_id = c.toString();
              }else if (col.title == that.mms_sixteenth_column_title) {
                that.mms_fifteenth_column_id = c.toString();
              }else if (col.title == that.mms_seventeenth_column_title) {
                that.mms_sixteenth_column_id = c.toString();
              }else if (col.title == that.mms_eighteenth_column_title) {
                that.mms_seventeenth_column_id = c.toString();
              }
              c++;
            }
          });
        });
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
          .column(10)
          .search('')
          .column(11)
          .search('')
          .column(12)
          .search('')
          .column(13)
          .search('')
          .column(14)
          .search('')
          .column(15)
          .search('')
          .column(16)
          .search('')
          .column(17)
          .search('')
          .column(18)
          .search('')
          .draw();
          // dtInstance.search('').draw()
          dtInstance.page(this.dt_mms_current_page).draw(false);
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
            .column(10)
            .search('')
            .column(11)
            .search('')
            .column(12)
            .search('')
            .column(13)
            .search('')
            .column(14)
            .search('')
            .draw();
        });
      }
    })
  }
  UnmatchTransactions() {
    var data_1_id: any[] = [];
    var data_2_id: any[] = [];
    var match_id_mms: string;
    var match_id_core: string;
    this.dtElements.forEach((dtElement: DataTableDirective, index: number) => {
      if (index == 0) {
        dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
          var rowData = dtInstance.rows({ selected: true }).data().toArray();
          //var rowData = dtInstance.rows({ search: 'applied' }).data().toArray();
          for (let i = 0; i < rowData.length; i++) {
            match_id_mms = (
              JSON.stringify(rowData[i].match_id, null, 4)
            );
            data_1_id.push(rowData[i].id);
            // this.count_ats_selected_data ++;
            //count_core_selected_data:number=0
          }
        });
      } else {
        dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
          //  var rowData = dtInstance.rows({ search: 'applied' }).data().toArray();
          var rowData = dtInstance.rows({ selected: true }).data().toArray();
          for (let i = 0; i < rowData.length; i++) {
            // data_2.push(rowData[i])
            match_id_core = (
              JSON.stringify(rowData[i].match_id, null, 4)
            );
            data_2_id.push(rowData[i].id);
            // this.count_core_selected_data ++;
          }
          console.log(this.selections)
          if (this.selections > 0) {
            if (match_id_mms == match_id_core) {


              Swal.fire({
                title: 'Unmatch transaction: ',
                text: 'are you sure to  unmatch for matched transaction?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#0acf97',
                cancelButtonColor: '#3085d6',
                confirmButtonText: 'ok',
              }).then((result) => {
                if (result.isConfirmed) {
                  console.log('unmatch transaction' + this.count_mms_selected_data + "===" + this.count_mms_selected_data + "===" + rowData.length);
                  console.log(data_1_id);
                  console.log(data_2_id);
                  this.autoReconFixedService
                    .unmatchTransactions(data_1_id.toString(), data_2_id.toString())
                    .subscribe(
                      (data: any) => {
                        if (data == true) {
                          this.showMatchSuccess();
                          this.dtElements.forEach(
                            (dtElement: DataTableDirective, index: number) => {
                              console.log('index: ' + index);
                              if (index == 0) {
                                dtElement.dtInstance.then(
                                  (dtInstance: DataTables.Api) => {
                                    dtInstance
                                      .rows({ search: 'applied' })
                                      .remove()
                                      .draw();
                                  }
                                );

                              }
                              else if (index == 1) {
                                dtElement.dtInstance.then(
                                  (dtInstance: DataTables.Api) => {
                                    dtInstance
                                      .rows({ search: 'applied' })
                                      .remove()
                                      .draw();

                                  }
                                );
                                this.clearAllSearches();

                              }
                            }
                          );
                          console.log('match success: ' + data);
                        } else console.log('ret: ' + JSON.stringify(data, null, 5));
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
                              (data: any) => {
                                if (data === true) {
                                  console.log(
                                    'refresh token success re-requesting the actual request'
                                  );
                                  this.localStorageService.clear(
                                    'refresh_token_requested'
                                  );
                                  //================================================================================
                                  this.reconViewService
                                    .unmatchTransactions(data_1_id.toString(), data_2_id.toString())
                                    .subscribe(
                                      (data: any) => {
                                        if (data == true) {
                                          this.showMatchSuccess();
                                          this.dtElements.forEach(
                                            (dtElement: DataTableDirective, index: number) => {
                                              console.log('index: ' + index);
                                              if (index == 0) {
                                                dtElement.dtInstance.then(
                                                  (dtInstance: DataTables.Api) => {
                                                    dtInstance
                                                      .rows({ search: 'applied' })
                                                      .remove()
                                                      .draw();
                                                  }
                                                );

                                              }
                                              else if (index == 1) {
                                                dtElement.dtInstance.then(
                                                  (dtInstance: DataTables.Api) => {
                                                    dtInstance
                                                      .rows({ search: 'applied' })
                                                      .remove()
                                                      .draw();

                                                  }
                                                );
                                                this.clearAllSearches();

                                              }
                                            }
                                          );
                                          console.log('match success: ' + data);
                                        } else console.log('ret: ' + JSON.stringify(data, null, 5));
                                      },
                                      (error: any) => {
                                        if (
                                          error.error.text ===
                                          'access-token-expired'
                                        ) {
                                          console.log(
                                            'refresh token expired.'
                                          );
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
                                  JSON.stringify(
                                    error.error.apierror,
                                    null,
                                    2
                                  )
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
                          console.log(
                            JSON.stringify(error.error.apierror, null, 2)
                          );
                        }
                      }
                    );
                }




                else {
                  console.log('canceled');
                }
              });
            }
            else {
              this.showSelectionEmpty()
            }

          }
        });
      }
    });
    // for(let i = 0; i<data_1.length; i++){
    //   data_1_amount_sum += Number(JSON.stringify(data_1[i].amount, null, 4))
    // }
    // for(let i = 0; i<data_2.length; i++){
    //   data_2_amount_sum += Number(JSON.stringify(data_2[i].amount, null, 4))
    //}
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
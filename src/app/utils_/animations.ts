import { trigger, animate, transition, style, query } from '@angular/animations'

export const fadeAnimation = trigger('fadeAnimation', [
  transition('* <=> *', [
    // query(':enter', [style({ opacity: 0, position: 'absolute' })], {
    //   optional: true,
    // }),
    query(
      ':enter',
      [
        style({ opacity: 0 }),
        animate('1s', style({ opacity: 1, position: 'relative' })),
      ],
      { optional: true },
    ),
    // query(
    //   ':leave',
    //   [
    //     style({ opacity: 1 }),
    //     animate('.6s', style({ opacity: 0, position: 'absolute' })),
    //   ],
    //   { optional: true },
    // ),
  ]),
])

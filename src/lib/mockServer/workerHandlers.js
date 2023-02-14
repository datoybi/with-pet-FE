import { rest } from 'msw';
import getFebData from 'lib/mocks/account/getFebData';
import getJanData from 'lib/mocks/account/getJanData';
import getMarData from 'lib/mocks/account/getMarData';
import { BASE_URL } from 'lib/APIs/client';
import {
  ALL_OF_HALLENGES,
  ONE_CHALLENGE,
} from 'lib/mocks/challenge/challengeGet';
import {
  ARTICLE_LIST_PAGE_ONE,
  ARTICLE_LIST_PAGE_TWO,
  ARTICLE_LIST_PAGE_THREE,
} from 'lib/mocks/article/articleGet';

export const workerHandlers = [
  // 소비 내역 전체를 조회합니다.
  rest.get('/consumption/:year/:month', (req, res, ctx) => {
    const { month } = req.params;

    let result = {
      code: 200,
      message: '정상적으로 조회되었습니다.',
      data: {
        consumptions: {},
      },
    };

    if (month === '02') {
      result = { ...getFebData };
    }
    if (month === '01') {
      result = { ...getJanData };
    }
    if (month === '03') {
      result = { ...getMarData };
    }

    return res(ctx.status(200), ctx.json(result));
  }),

  rest.post('/consumption', (req, res, ctx) => {
    const { petId, feed, toy, hospital, beauty, etc, date } = req.body;
    const [, month, day] = date.split('-');

    let json = {};
    if (month === '02') {
      json = getFebData;
    }
    if (month === '01') {
      json = getJanData;
    }
    if (month === '03') {
      json = getMarData;
    }
    json.data.consumptions[day] = [
      {
        id: 1,
        pet_id: petId,
        feed: Number(feed),
        toy: Number(toy),
        hospital: Number(hospital),
        beauty: Number(beauty),
        etc: Number(etc),
        date: Number(date),
      },
    ];
    // todos.push(req.body);
    return res(ctx.status(201));
  }),

  /** -------------------------------------------------- */
  /** ---------------- Challenge ----------------------- */
  rest.get(`${BASE_URL}/challenge`, (req, res, ctx) => {
    return res(ctx.json(ALL_OF_HALLENGES));
  }),

  /** -------------------------------------------------- */
  /** ---------------- Article ----------------------- */
  rest.get(`${BASE_URL}/article`, (req, res, ctx) => {
    const { pageNum } = req.params;

    if (pageNum === 1) {
      return res(ctx.json(ARTICLE_LIST_PAGE_ONE));
    }

    if (pageNum === 2) {
      return res(ctx.json(ARTICLE_LIST_PAGE_TWO));
    }

    if (pageNum === 3) {
      return res(ctx.json(ARTICLE_LIST_PAGE_THREE));
    }

    return res(ctx.json(ARTICLE_LIST_PAGE_ONE));
  }),
];

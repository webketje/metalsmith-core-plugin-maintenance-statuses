import Metalsmith from "metalsmith";
import requests from "@metalsmith/requests";
import layouts from "@metalsmith/layouts";
import { URL } from "url";
import { dirname } from "path";

const corePlugins = [
  { owner: 'metalsmith', repo: 'drafts'},
  { owner: 'metalsmith', repo: 'sass'},
  { owner: 'metalsmith', repo: 'remove'},
  { owner: 'metalsmith', repo: 'collections'},
  { owner: 'metalsmith', repo: 'permalinks'},
  { owner: 'metalsmith', repo: 'layouts'},
  { owner: 'metalsmith', repo: 'in-place'},
  { owner: 'metalsmith', repo: 'requests'},
  { owner: 'metalsmith', repo: 'metadata'},
  { owner: 'metalsmith', repo: 'default-values'},
  { owner: 'metalsmith', repo: 'markdown'},
  { owner: 'metalsmith', repo: 'postcss'},
  { owner: 'metalsmith', repo: 'table-of-contents'}
]

const ms = Metalsmith(dirname(new URL(import.meta.url).pathname))

ms
  .use(requests({
    url: 'https://api.github.com/repos/:owner/:repo/releases/latest',
    params: corePlugins,
    out: { key: 'plugins.:repo' },
    options: {
      method: 'GET',
      headers: {
        Accept: 'application/vnd.github+json',
        Authorization: `metalsmith:${process.env.GITHUB_TOKEN}`
      }
    }
  }))
  .use(layouts({
    default: 'default.njk',
    pattern: '**/*.html'
  }))
  .build((err) => {
    if (err) throw err
    console.log('Build success')
  })
  
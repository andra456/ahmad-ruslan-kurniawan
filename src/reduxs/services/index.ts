import { fetchAPI } from '../../util/fetcher';
export const getAllorg = (req : any ) => fetchAPI('GET',`/organizations`,{})
export const getDetailorg = (req : any ) => fetchAPI('GET',`/orgs/${req.org}`,{})
export const searchGit = (req : any) => fetchAPI('GET','/search/code', req)
export const getRepos = (req : any ) => fetchAPI('GET',`/orgs/${req.org}/repos`, {})
export const getrepoDetail = (req : any) => fetchAPI('GET', `/repos/${req.org}/${req.repo}`, {} )
export const getAccount = (username : any ) => fetchAPI('GET',`/users/${username}`, {})

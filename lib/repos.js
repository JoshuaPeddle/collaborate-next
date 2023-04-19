import { clientPromise, dbName } from './mongodb';
import { ObjectId } from 'mongodb';

function timeSincePush(repo) {
  let timeSincePushStr;
  let timeSincePushSecs = (new Date(new Date().toUTCString()) - repo.Repo_pushed_at)/1000;
  let timeSincePushDays = Math.floor(timeSincePushSecs/86400);
  if (timeSincePushDays == 0) {
    if (timeSincePushSecs < 60) {
      timeSincePushStr = 'Just now';
    } else if (timeSincePushSecs < 3600) {
      timeSincePushStr = Math.floor(timeSincePushSecs/60) + ' minutes ago';
    } else {
      timeSincePushStr = Math.floor(timeSincePushSecs/3600) + ' hours ago';
    }
  } else if (timeSincePushDays == 1) {
    timeSincePushStr = 'Yesterday';
  } else if (timeSincePushDays < 7) {
    timeSincePushStr = timeSincePushDays + ' days ago';
  } else if (timeSincePushDays < 14) {
    timeSincePushStr = 'Last week';
  } else if (timeSincePushDays < 21) {
    timeSincePushStr = '2 weeks ago';
  } else if (timeSincePushDays < 28) {
    timeSincePushStr = '3 weeks ago';
  } else if (timeSincePushDays < 60) {
    timeSincePushStr = 'Last month';
  } else if (timeSincePushDays < 365) {
    timeSincePushStr = Math.floor(timeSincePushDays/30) + ' months ago';
  };

  return {timeSincePushSecs, timeSincePushStr};
}

export async function getRepoData() {
  const client = await clientPromise;
  const db = client.db(dbName);
  const repositories = await db.collection('repositories').find({}).limit(100).toArray();
  // Need to convert _id to a string to be able to use it in the URL
  repositories.forEach((repo) => {
    repo._id = repo._id.toString();
  });
  const newRepositories = repositories.map((repo) => {
    let newRepo = {};
    let time = timeSincePush(repo);
    newRepo.id = repo._id;
    newRepo.Repo_avatar = repo.Repo_avatar;
    newRepo.Repo_name = repo.Repo_name;
    newRepo.Repo_url = repo.Repo_url;
    newRepo.Repo_description = repo.Repo_description;
    newRepo.Repo_languages = repo.Repo_languages;
    newRepo.Repo_stars = repo.Repo_stars;
    newRepo.Repo_owner_name = repo.Repo_owner_name;
    newRepo.Repo_num_issues = repo.Repo_num_issues;
    newRepo.Repo_num_recent_issues = repo.Repo_num_recent_issues;
    newRepo.Repo_time_since_push_seconds = time.timeSincePushSecs;
    newRepo.Repo_time_since_push_str = time.timeSincePushStr;
    return newRepo;
  });
  return newRepositories;
}
  
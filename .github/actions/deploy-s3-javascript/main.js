const core = require("@actions/core");
const github = require("@actions/github");
const exec = require("@actions/exec");

const run = () => {
  // get some input values
  const bucket = core.getInput("bucket", { required: true });
  const bucketRegion = core.getInput("bucket-region", { required: true });
  const distFolder = core.getInput("dist-folder", { required: true });

  // upload the files
  const s3Uri = `s3://${bucket}`;
  exec.exec(`aws s3 sync ${distFolder} ${s3Uri} --region ${bucketRegion}`);

  const siteURL = `http://${bucket}.s3-website-${bucketRegion}.amazonaws.com`;
  core.setOutput("site-url", siteURL);
};

run();

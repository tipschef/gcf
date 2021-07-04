
# GENERATE-BOOK

This GCF is listen to a GCP PUB/SUB which is automatically created on deployment with Google Cloud Build.

## Necessary env variable

`API_DOMAIN` : API domain<br />
`API_PORT` : API port<br />
`API_PREFIX` : if API is using HTTP : http:// else https://

## Build
This GCF is automatically build on push

###Build local
run this command from the root directory `gcloud builds submit --config ./generate-book/cloudbuild.yaml ./generate-book/.`


## Develop
To run this GCF localy run the `index.js` file



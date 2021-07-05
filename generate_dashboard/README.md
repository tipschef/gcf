# GCF-GENERATE_DASHBOARD

This GCF is triggered by a Google Cloud Scheduler every hours.
It send payload to the topic called `topic_trigger_dev_start_gcf_generate_dashboard` with an empty payload

## Build
This GCF is automatically build on push

### Build local
run this command from the root directory `gcloud builds submit --config ./generate_dashboard/cloudbuild.yaml ./generate_dashboard/.`

## Develop
To run this GCF localy run the `local_main.py` file
- You have to set `PROJECT_ID` and `PROJECT_ENV` in order to run it.
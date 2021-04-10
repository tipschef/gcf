# GCF_GET_PEOPLE_TO_PAY

This GCF is triggered by a Google Cloud Scheduler every 27 of each month.
It send payload to the topic called `topic_trigger_dev_get_people_to_pay` with an empty payload

## Build
This GCF is automatically build on push

###Build local
run this command from the root directory `gcloud builds submit --config ./gcf_get_people_to_pay/cloudbuild.yaml ./gcf_get_people_to_pay/.`

## Develop
To run this GCF localy run the `local_main.py` file

## Tests


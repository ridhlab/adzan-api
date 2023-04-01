# Adzan - API

> Adzan API to get information about adzan time in Indonesia

### Endpoints

-   [x] `/city` Get all cities available.
-   [x] `/city/:id` Get detail city.
-   [x] `/adzan?cityId={cityId}&month={month}&year={year}&date={date}` Get adzan time. Example `/adzan?cityId=141&month=7&year=2023&date=17`. If no date in request, it will return adzan time in full month.

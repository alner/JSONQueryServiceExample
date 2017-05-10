# Run

Hit
```
 npm start
```
to run.

# Usage

Make http post request to :8000.

Request example:
```
{
  "url": "https://declarations.com.ua/declaration/nacp_7171fd8e-7651-4dd9-827b-54c7a40cbcbf?format=json",
  "query": ["declaration.nacp_orig.step_9.*", "declaration.nacp_orig.step_11.*", "declaration.nacp_orig.step_2.*"]
}
``` 

"query" contains array of object property path which should be extracted into its own table.
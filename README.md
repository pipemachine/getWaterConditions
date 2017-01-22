# USGS Water Condition Retrieval jQuery Plugin

## Requirments
* jQuery is the only software dependency for this plugin.
* This plugin is heavily reliant on the [USGS REST Service](https://waterservices.usgs.gov/rest/IV-Service.html#Testing). It is import that the API endpoints are active and that they continue to support CORS (Cross-Origin Resource Sharing)

## Contents
* getWaterConditions.js is the actual jQuery plugin itself. It contains the minimal description and comments for use.
* getWaterConditions.html is an example of how to use the plugin in an html page.

## Usage
First, be sure to include the plugin, along with jQuery, in your html page. The plugin is used by calling the main function with an object of options. For example
```
  $().getWaterConditions({trigger:'#blueStatus', 
                          siteNumber:'09050700', 
                          targets:{
                            flowTarget:'#displayFlowBlue',
                            nameTarget:'#displayNameBlue',
                            numberTarget:'#displayNumberBlue',
                            dateTarget:'#displayDateBlue',
                            timeTarget:'#displayTimeBlue'
                          },
                          singleTarget: null
                         });

```

Descriptions for all the option values follow. NOTE: either targets OR singleTarget is required, not both (set the one that's not used to null).

| Option | Description |
| ------ | ----------- |
| trigger | An id/class tag of an element who's click triggers the data fetch |
| siteNumer | The USGS site number for the correponding location of the river |
| targets | An object of additional options that specify rendering targets |
| flowTarget | An element tag (id/class) for the flow value to render |
| nameTarget | An element tag (id/class) for the site name  to render |
| numberTarget | An element tag (id/class) for the site number to render |
| dateTarget | An element tag (id/class) for the date to render |
| timeTarget | An element tag (id/class) for the (24hr) time to render |

The call(s) to the plugin should be in `<script> </script>` tags. 

## Example
The example includes the proper use of the plugin for both the targets object and singleTarget. The expected behavior of the example follows:

![Alt expectedBehavior](expectedBehavior.gif?raw=true "Expected Behavior of Plugin from Example")

When running the example (or the plugin in any case) in a local setting, it has to be behind a webserver! If there is no webserver, the browser will not set origin and auth headers properly to interact with the CORS policy on the server. One option for a very simple webserver is using a the python module for this purpose (the following are run from the dir to be served):
```
python -m SimpleHTTPServer 8000
```
Or for python 3
```
python3 -m http.server 8000
```
Then the files are served to `localhost:8000`

## Additional Notes
* If it is inconvenient to upload the plugin file and reference it in html, one can always drop the whole plugin inside `<script> </script>` in the html page and still use it just as in the examples.


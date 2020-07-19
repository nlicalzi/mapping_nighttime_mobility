## Quick Hits for CUSP Capstone

### 7/14 Call

#### Research Questions:

* Where is NYC's nightlife located?
  * Are there specific clusters? How might we identify them?
  * Are there any 'surprising' clusters? How might we identify them?
  * Do identified nightlife clusters relate in anyway to built environment characteristics?
* What is the relationship between NYC's nightlife and transit mode choice?
  * Does weather have a greater effect on travel to specific clusters?
  * Is there a difference in travel levels from week to weekend? From day to night?
  * Is there a relationship between number of Citibike or MTA stations and the number of venues in a given area? What about the overall pct. of business that are venues?
* How has COVID affected night-time travel in NYC, w/ specific regard to nightlife activities?
  * Have some nightlife clusters seen a bigger drop than others? Why might that be?
  * What is the citywide decrease in transit utilization by mode?
    * With that baseline decrease established, do certain areas see bigger decreases than the mean for each mode of transit?
    * Subway ridership per resident

#### Vizzes:

* 

## Previous Notes

##### Original Project goals:

CUSP team will overlay data sets (venue map, mobility patterns from taxi, rideshare, and CitiBike trips, public transportation lines, and ticketing data) to gain an initial understanding of how New Yorkers travel to and from music venues at different times of night. Key questions to answer:

* What does rideshare/TLC usage look like around music venues in various parts of the city? How does this change for specific events?
* What correlation exists between rideshare/TLC dropoff/pickups, and venues’ distance from public transit (subway/bus)? Citi Bike data?
* What correlations exist between specific train or bus line frequencies at certain times of night, and a rise in rideshare/TLC usage?
* What patterns exist for different venues (ex: are Citi bike rides markedly higher for certain venues, neighborhoods, or certain performance dates? Are riders more likely to UberPool/LyftLine from certain venues or neighbourhoods?)
* Based upon rideshare/TLC data, what might a transportation carbon footprint for several sample events look like in NYC?



#### Thoughts

* Density plot of venues (to obscure actual specific locations, preserve anonymity)
  * terminology: isarithmic? isopleth?
  * Using Seaborn: https://python-graph-gallery.com/1136-2/
  * 2d contour w/ marginal plots: https://python-graph-gallery.com/82-marginal-plot-with-seaborn/
  * 2D hist/binnings: https://jakevdp.github.io/PythonDataScienceHandbook/04.05-histograms-and-binnings.html
* Network analysis for walkshed from subway lines/stops and bus lines/stops
  * https://www.baruch.cuny.edu/confluence/display/geoportal/NYC+Mass+Transit+Spatial+Layers
  * OSMnx isochrones: https://geoffboeing.com/2017/08/isochrone-maps-osmnx-python/
* Aggregate PLUTO statistics by hexbin
  * Built square footage, both commercial and residential
  * Land use (resi, commercial, industrial)



## 3/24 Call

* Nothing nightlife-relief specific yet in Berlin, just general biz loans and relief
* Vibelab actions:
  * www.nightlife.org blog
  * www.unitedwestream.berlin
  * whatsapp group w/ int'l players and orgs



**GENERAL NOTES**

* How does behavior change over time? Small multiple plots / sparklines? Comparisons to other times of day? Basic description of what’s going on? Utility of creating and sharing a dataset? Volume of trips in some mode relative to daytime? Do people in this specific neighborhood use Citibikes at night more than people in this other part of the city?
* Read policy prescriptions in Creative Footprint report to understand how to communicate takeaways


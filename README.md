## Quick Hits for CUSP Capstone

##### Project goals:

CUSP team will overlay data sets (venue map, mobility patterns from taxi, rideshare, and CitiBike trips, public transportation lines, and ticketing data) to gain an initial understanding of how New Yorkers travel to and from music venues at different times of night. Key questions to answer:

* What does rideshare/TLC usage look like around music venues in various parts of the city? How does this change for specific events?
* What correlation exists between rideshare/TLC dropoff/pickups, and venues’ distance from public transit (subway/bus)? Citi Bike data?
* What correlations exist between specific train or bus line frequencies at certain times of night, and a rise in rideshare/TLC usage?
* What patterns exist for different venues (ex: are Citi bike rides markedly higher for certain venues, neighborhoods, or certain performance dates? Are riders more likely to UberPool/LyftLine from certain venues or neighbourhoods?)
* Based upon rideshare/TLC data, what might a transportation carbon footprint for several sample events look like in NYC?



#### Thoughts

* Density plot of venues (to obscure actual specific locations, preserve anonymity)
  * Using Seaborn: https://python-graph-gallery.com/1136-2/
  * 2d contour w/ marginal plots: https://python-graph-gallery.com/82-marginal-plot-with-seaborn/
  * 2D hist/binnings: https://jakevdp.github.io/PythonDataScienceHandbook/04.05-histograms-and-binnings.html
* Network analysis for walkshed from subway lines/stops and bus lines/stops
  * https://www.baruch.cuny.edu/confluence/display/geoportal/NYC+Mass+Transit+Spatial+Layers
  * OSMnx isochrones: https://geoffboeing.com/2017/08/isochrone-maps-osmnx-python/
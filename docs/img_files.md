# Manipulating image files

## ImageMagick (linux, Mac)

### Installation

Go to the [ImageMagic installation page](https://imagemagick.org/script/download.php) for detailed instructions for different operating systems.

### Utilities

ImageMagick has a list of utilities that can be used for different purposes. The following table presents a summary of those. Then, I will show some examples for each of these utilities. These examples will help you better understand how to use them.

When specifying a color in any ImageMagick command, you can use the name of any [recognized color](#imagemagick-color-list), the RGB value, or the Hex value.

When specifying a shape to draw on an image, you can use any of the [valid shapes](#imagemagick-shapes).

| Utility | Use | Syntax | Links |
| --- | --- | --- | --- |
| `magick` | This command now replaces `convert`, which is deprecated. Change image format, blur, crop, draw on, flip, merge, resample, and more. Writes output on a new file. | `magick [input-options] input-file(s) [output-options] output-file` | [Man page](https://docs.oracle.com/cd/E88353_01/html/E37839/convert-1.html), [Documentation](https://imagemagick.org/script/convert.php) |
| `identify` | Obtain information about an image. | `identify [options] input-file` | [Man page](https://docs.oracle.com/cd/E88353_01/html/E37839/identify-1.html), [Documentation](http://imagemagick.org/script/identify.php) |
| `mogrify` | Resize an image, blur, crop, draw on, flip, merge, resample, and more. Re-writes original file. | `mogrify [options] input-file` | [Man page](https://docs.oracle.com/cd/E88353_01/html/E37839/mogrify-1.html), [Documentation](http://imagemagick.org/script/mogrify.php) |
| `composite` | Overlaps one image over another. | `composite  [  options ... ] change-file base-file [ mask-file ] output-image` | [Man page](https://docs.oracle.com/cd/E88353_01/html/E37839/composite-1.html), [Documentation](http://imagemagick.org/script/composite.php) |
| `montage` | Combines different images, adds border, frame, and much more. | `montage input-file[s] [options] output-file` | [Man page](https://docs.oracle.com/cd/E88353_01/html/E37839/montage-1.html), [Documentation](http://imagemagick.org/script/montage.php) |
| `compare` | Compare two images. | `compare input-file input-file [options] output-file` | [Man page](https://docs.oracle.com/cd/E88353_01/html/E37839/compare-1.html), [Documentation](http://imagemagick.org/script/compare.php) |
| `stream` | Writes the pixel components of an img a row at a time into different storage formats. | `compare input-file input-file [options] output-file` | [Man page](https://docs.oracle.com/cd/E88353_01/html/E37839/stream-1.html), [Documentation](http://imagemagick.org/script/stream.php) |
| `display` | Displays an image or image sequence. | `display [options] input-file` | [Man page](https://docs.oracle.com/cd/E88353_01/html/E37839/display-1.html), [Documentation](http://imagemagick.org/script/display.php) |
| `animate` | Animates an image sequence. | `animate [options] input-file` | [Man page](https://docs.oracle.com/cd/E88353_01/html/E37839/animate-1.html), [Documentation](http://imagemagick.org/script/animate.php) |
| `import` | Saves  any  visible  window as an img file. Captures a single window, the entire screen, or any rectangular portion of the screen. | `import [options] output-file` | [Man page](https://docs.oracle.com/cd/E88353_01/html/E37839/import-1.html), [Documentation](http://imagemagick.org/script/import.php) |
| `conjure` | Interprets and executes scripts written in the Magick Scripting Language (MSL). | `conjure [options] script.msl` | [Man page](https://docs.oracle.com/cd/E88353_01/html/E37839/conjure-1.html), [Documentation](http://imagemagick.org/script/conjure.php) |

### Examples

In the following examples we will use this image:

![original](img/grandma.jpg)

#### `magick`

Syntax: `magick [input-option] input-file [output-option] output-file`

**Changing the color of pixels:**

In the following example we are replacing all pixels that have a distance of at most 50%, 60% and 100% from 255 in the blue value of their RGB:

```bash
magick grandma.jpg -fuzz 50% -fill "red" -opaque "blue" grandma_50.jpg
magick grandma.jpg -fuzz 60% -fill "red" -opaque "blue" grandma_60.jpg
magick grandma.jpg -fuzz 100% -fill "red" -opaque "blue" grandma_100.jpg
```

Meaning of used options:

1. `fuzz`: Distance from 255 in those pixels to be matched.
    - 50% means any pixel with blue value between 127.5 (50% of 255) and 255.
    - 60% means any pixel with blue value between 102 and 255. 60% of 255 is 153, and 255-153=102. Any pixel with blue value within this range will be at most 60% away from being 100% blue.
    - 100% means any pixel with blue value at most 100% away from being 100% blue, this includes all pixels in the image.
2. `opaque`: Color to be replaced. See the list of [recognized colors](#imagemagick-color-list).

Output with 50% of fuzz:

![50% fuzz](img/grandma_50.jpg)

Output with 60% of fuzz:

![50% fuzz](img/grandma_60.jpg)

Output with 100% of fuzz:

![50% fuzz](img/grandma_100.jpg)

You can also change the color of pixels in a specific area:

```bash
magick grandma.jpg -fill "rgb(255,250,250)" -draw "rectangle 0,300 200,350" grandma_rect.jpg
```

Meaning of used options:

1. `fill`: Color to fill the form. See the list of [recognized colors](#imagemagick-color-list).
2. `draw`: Shape to draw. See list of [valid shapes and their parameters](#imagemagick-shapes).

Output:

![rectangle](img/grandma_rect.jpg)

**Add text over the rectangle drawn on the image above:**

```bash
magick grandma_rect.jpg -font helvetica -fill black -pointsize 15 -draw "text 0,315 'Grandma\nand\nbaby'" grandma_rect_txt.png
```

Meaning of used options:

1. `font`: Font for the text. To see the list of all available fonts type `magick -list font`.
2. `fill`: Color to fill the form, in this case the text. See the list of [recognized colors](#imagemagick-color-list).
3. `pointsize`: Text size.
4. `draw`: Shape to draw. See list of [valid shapes and their parameters](#imagemagick-shapes).

Output:

![text](img/grandma_rect_txt.png)

**Concatenate images horizontally:**

In the following example I will concatenate some images (`grandma.jpg grandma_50.jpg grandma_100.jpg`) horizontally, add a border, and flip the image along the horizontal axis.

```bash
magick grandma.jpg grandma_50.jpg grandma_100.jpg +append -resize x300 -bordercolor black -border 10x15 -flip horizontal.png
```

Meaning of used options:

1. `resize`: Force the output file to have a *height* of 300 pixels. If the input images have different heights, then this parameter is recommended. Otherwise, the output will have the same height as the input files if this parameter is not used.
2. `bordercolor`: Color of the border. See the list of [recognized colors](#imagemagick-color-list).
3. `border`: Add a border with the specified thickness. In this case we are adding a border with a thickness of 10 pixels on the left and right and 15 pixels on the top and bottom.
4. `flip`: I'm flipping the *output* image along the *horizontal axis*. To flip the image along the vertical axis, use `-flop`. Make sure to insert the `flip` flag after `+append` to apply the flip to the output instead of any of the input files. See example below on how to apply `flip` or `flop` to the input instead of output files.

Output:

![horizontal](img/horizontal.png)

**Concatenate images vertically:**

In the following example I will concatenate some images (`grandma.jpg` and `grandma_50.jpg`) horizontally. *Before* the concatenation, I will flip the first input file along the vertical axis and transform the color space to Gray.

```bash
magick grandma.jpg -colorspace Gray -flop grandma_50.jpg -append -resize 300x vertical.png
```

Meaning of used options:

1. `colorspace`: Color space to apply to the *input* image. It will apply to any input image specified before the flag, in this case `grandma.jpg`. If we wanted the whole output file to be on Gray scale, we would add the flag at the end of all input images. Available color spaces: `sRGB`, `RGB`, `Gray`, `HSV`, `HSB`, `HSL`, `LAB`, `LCH`, `CMYK`, `XYZ`, `YUV`, `YCbCr`, `AdobeRGB`, plus others.
2. `flop`: I'm flipping the *input* image (grandma.jpg) along the *vertical axis*. To flip the image along the horizontal axis, use `flip`.
3. `resize`: Force the output file to have a *width* of 300 pixels. If the input images have different widths, then this parameter is recommended. Otherwise, the output will have the same width as the input files if this parameter is not used.

Output:

![vertical](img/vertical.png)

**Detect edges:**

In the following example I will detect edges in the image generated in the example above using two methods: the standard edge detection with the `-edge` flag, and the Canny Edge detection with smoothing using `-canny`. `-canny` is more sophisticated and allows for modifying the radius, sigma and threshold for filtering out edges.

```bash
magick vertical.png -edge 2 edges.png
magick vertical.png -canny 0x1+10%+30% edges2.png
```

Meaning of used options:

1. `-edge 2`: Apply an edge of radius 2. To make the edges thicker, increment the value of `2`, or to make them thinner, give a value of `1`.
2. `-canny 0x1+10%+30%`: Apply Canny Edge Detection with smoothing. The arguments here set the radius to 0 (auto-determined) and sigma to 1. Increase sigma for more smoothing. 10% and 30% are the lower and upper percentage thresholds for edge detection. Play around with these values to filter out weaker edges and highlight more important ones. Increasing the upper percentage will remove more edges.

Output using `-edge`:

![edge](img/edges.png)

Output using `-canny`:

![canny](img/edges2.png)

#### `identify`

#### `mogrify`

#### `composite`

#### `montage`

#### `compare`

#### `stream`

#### `display`

#### `animate`

#### `import`

#### `conjure`

### ImageMagick shapes

| Shape | Syntax | Notes |
| --- | --- | --- |
| Point | `point x,y` | Specified by an ordered pair of integer coordinates. |
| Line | `line x0,y0 x1,y1` | Requires a start and end point. |
| Rectangle | `rectangle x0,y0 x1,y1` | Specified by the pair of points at the upper left and lower right corners. |
| Round rectangle | `roundRectangle x0,y0, x1,y1 wc,hc` | Takes same corner points as `rectangle`, followed by the width and height of the rounded corners to be removed. |
| Arc | `arc x0,y0 x1,y1 a0,a1` | Requires two corners used to create a `rectangle`, followed by the start and end angles of the arc in degrees. |
| Ellipse | `ellipse x0,y0 rx,ry a0,a1` | Requires the center point, the horizontal and vertical radius, and the start and end angles in degrees. |
| Circle | `circle x0,y0 x1,y1` | Give the center and any point on the perimeter. Can make a disk (filled) or circle (unfilled). |
| Polyline | `polyline x0,y0 ... xn,yn` | Requires three or more points to define their perimeters. This is simply a polygon in which the final point is not stroked to the start point. |
| Polygon | `polygon x0,y0 ... xn,yn` | Requires three or more points to define their perimeters. |
| Bezier | `bezier x0,y0 ... xn,yn` | Creates a spline curve and requires three or points to define its shape. |
| Path | `path specification` | represents an outline of an object, defined in terms of `moveto` (set a new current point), `lineto` (draw a straight line), `curveto` (draw a Bezier curve), arc (elliptical or circular arc) and `closepath` (close the current shape by drawing a line to the last `moveto`) elements. |
| Image | `image operator x0,y0 w,h filename` | Used to composite an image with another image. |
| Text | `text x,y text_to_display` | Add text in coordinates x,y of image. |

### ImageMagick color list

| Color name | RGB | Hex |
| --- | --- | --- |
| <font style="background-color: #FFFAFA;">snow1</font> | rgb(255,250,250) | #FFFAFA |
| snow2 | rgb(238,233,233) | #EEE9E9 |
| snow3 | rgb(205,201,201) | #CDC9C9 |
| snow4 | rgb(139,137,137) | #8B8989 |
| RosyBrown | rgb(188,143,143) | #BC8F8F |
| RosyBrown1 | rgb(255,193,193) | #FFC1C1 |
| RosyBrown2 | rgb(238,180,180) | #EEB4B4 |
| RosyBrown3 | rgb(205,155,155) | #CD9B9B |
| RosyBrown4 | rgb(139,105,105) | #8B6969 |
| LightCoral | rgb(240,128,128) | #F08080 |
| IndianRed | rgb(205,92,92) | #CD5C5C |
| IndianRed1 | rgb(255,106,106) | #FF6A6A |
| IndianRed2 | rgb(238,99,99) | #EE6363 |
| IndianRed3 | rgb(205,85,85) | #CD5555 |
| IndianRed4 | rgb(139,58,58) | #8B3A3A |
| brown | rgb(165,42,42) | #A52A2A |
| brown1 | rgb(255,64,64) | #FF4040 |
| brown2 | rgb(238,59,59) | #EE3B3B |
| brown3 | rgb(205,51,51) | #CD3333 |
| brown4 | rgb(139,35,35) | #8B2323 |
| firebrick | rgb(178,34,34) | #B22222 |
| firebrick1 | rgb(255,48,48) | #FF3030 |
| firebrick2 | rgb(238,44,44) | #EE2C2C |
| firebrick3 | rgb(205,38,38) | #CD2626 |
| firebrick4 | rgb(139,26,26) | #8B1A1A |
| crimson | rgb(220,20,60) | #DC143C |
| red | rgb(255,0,0) | #FF0000 |
| red1 | rgb(255,0,0) | #FF0000 |
| red2 | rgb(238,0,0) | #EE0000 |
| red3 | rgb(205,0,0) | #CD0000 |
| red4 | rgb(139,0,0) | #8B0000 |
| DarkRed | rgb(139,0,0) | #8B0000 |
| LightPink | rgb(255,182,193) | #FFB6C1 |
| LightPink1 | rgb(255,174,185) | #FFAEB9 |
| LightPink2 | rgb(238,162,173) | #EEA2AD |
| LightPink3 | rgb(205,140,149) | #CD8C95 |
| LightPink4 | rgb(139,95,101) | #8B5F65 |
| pink | rgb(255,192,203) | #FFC0CB |
| pink1 | rgb(255,181,197) | #FFB5C5 |
| pink2 | rgb(238,169,184) | #EEA9B8 |
| pink3 | rgb(205,145,158) | #CD919E |
| pink4 | rgb(139,99,108) | #8B636C |
| PaleVioletRed | rgb(219,112,147) | #DB7093 |
| PaleVioletRed1 | rgb(255,130,171) | #FF82AB |
| PaleVioletRed2 | rgb(238,121,159) | #EE799F |
| PaleVioletRed3 | rgb(205,104,137) | #CD6889 |
| PaleVioletRed4 | rgb(139,71,93) | #8B475D |
| LavenderBlush | rgb(255,240,245) | #FFF0F5 |
| LavenderBlush1 | rgb(255,240,245) | #FFF0F5 |
| LavenderBlush2 | rgb(238,224,229) | #EEE0E5 |
| LavenderBlush3 | rgb(205,193,197) | #CDC1C5 |
| LavenderBlush4 | rgb(139,131,134) | #8B8386 |
| violet | rgb(238,130,238) | #EE82EE |
| VioletRed | rgb(208,32,144) | #D02090 |
| VioletRed1 | rgb(255,62,150) | #FF3E96 |
| VioletRed2 | rgb(238,58,140) | #EE3A8C |
| VioletRed3 | rgb(205,50,120) | #CD3278 |
| VioletRed4 | rgb(139,34,82) | #8B2252 |
| MediumVioletRed | rgb(199,21,133) | #C71585 |
| HotPink1 | rgb(255,110,180) | #FF6EB4 |
| HotPink2 | rgb(238,106,167) | #EE6AA7 |
| HotPink3 | rgb(205,96,144) | #CD6090 |
| HotPink4 | rgb(139,58,98) | #8B3A62 |
| HotPink | rgb(255,105,180) | #FF69B4 |
| DeepPink | rgb(255,20,147) | #FF1493 |
| DeepPink1 | rgb(255,20,147) | #FF1493 |
| DeepPink2 | rgb(238,18,137) | #EE1289 |
| DeepPink3 | rgb(205,16,118) | #CD1076 |
| DeepPink4 | rgb(139,10,80) | #8B0A50 |
| maroon1 | rgb(255,52,179) | #FF34B3 |
| maroon2 | rgb(238,48,167) | #EE30A7 |
| maroon3 | rgb(205,41,144) | #CD2990 |
| maroon4 | rgb(139,28,98) | #8B1C62 |
| maroon(SVGcompliance) | rgb(128,0,0) | #800000 |
| maroon(X11compliance) | rgb(176,48,96) | #B03060 |
| orchid | rgb(218,112,214) | #DA70D6 |
| orchid1 | rgb(255,131,250) | #FF83FA |
| orchid2 | rgb(238,122,233) | #EE7AE9 |
| orchid3 | rgb(205,105,201) | #CD69C9 |
| orchid4 | rgb(139,71,137) | #8B4789 |
| MediumOrchid | rgb(186,85,211) | #BA55D3 |
| MediumOrchid1 | rgb(224,102,255) | #E066FF |
| MediumOrchid2 | rgb(209,95,238) | #D15FEE |
| MediumOrchid3 | rgb(180,82,205) | #B452CD |
| MediumOrchid4 | rgb(122,55,139) | #7A378B |
| DarkOrchid | rgb(153,50,204) | #9932CC |
| DarkOrchid1 | rgb(191,62,255) | #BF3EFF |
| DarkOrchid2 | rgb(178,58,238) | #B23AEE |
| DarkOrchid3 | rgb(154,50,205) | #9A32CD |
| DarkOrchid4 | rgb(104,34,139) | #68228B |
| thistle1 | rgb(255,225,255) | #FFE1FF |
| thistle2 | rgb(238,210,238) | #EED2EE |
| plum | rgb(221,160,221) | #DDA0DD |
| plum1 | rgb(255,187,255) | #FFBBFF |
| plum2 | rgb(238,174,238) | #EEAEEE |
| plum3 | rgb(205,150,205) | #CD96CD |
| plum4 | rgb(139,102,139) | #8B668B |
| thistle | rgb(216,191,216) | #D8BFD8 |
| thistle3 | rgb(205,181,205) | #CDB5CD |
| thistle4 | rgb(139,123,139) | #8B7B8B |
| fuchsia | rgb(255,0,255) | #FF00FF |
| magenta | rgb(255,0,255) | #FF00FF |
| magenta1 | rgb(255,0,255) | #FF00FF |
| magenta2 | rgb(238,0,238) | #EE00EE |
| magenta3 | rgb(205,0,205) | #CD00CD |
| magenta4 | rgb(139,0,139) | #8B008B |
| DarkMagenta | rgb(139,0,139) | #8B008B |
| DarkViolet | rgb(148,0,211) | #9400D3 |
| BlueViolet | rgb(138,43,226) | #8A2BE2 |
| indigo | rgb(75,0,130) | #4B0082 |
| purple1 | rgb(155,48,255) | #9B30FF |
| purple2 | rgb(145,44,238) | #912CEE |
| purple3 | rgb(125,38,205) | #7D26CD |
| purple4 | rgb(85,26,139) | #551A8B |
| purple(X11compliance) | rgb(160,32,240) | #A020F0 |
| purple(SVGcompliance) | rgb(128,0,128) | #800080 |
| MediumPurple | rgb(147,112,219) | #9370DB |
| MediumPurple1 | rgb(171,130,255) | #AB82FF |
| MediumPurple2 | rgb(159,121,238) | #9F79EE |
| MediumPurple3 | rgb(137,104,205) | #8968CD |
| MediumPurple4 | rgb(93,71,139) | #5D478B |
| LightSlateBlue | rgb(132,112,255) | #8470FF |
| MediumSlateBlue | rgb(123,104,238) | #7B68EE |
| DarkSlateBlue | rgb(72,61,139) | #483D8B |
| SlateBlue | rgb(106,90,205) | #6A5ACD |
| SlateBlue1 | rgb(131,111,255) | #836FFF |
| SlateBlue2 | rgb(122,103,238) | #7A67EE |
| SlateBlue3 | rgb(105,89,205) | #6959CD |
| SlateBlue4 | rgb(71,60,139) | #473C8B |
| GhostWhite | rgb(248,248,255) | #F8F8FF |
| lavender | rgb(230,230,250) | #E6E6FA |
| blue | rgb(0,0,255) | #0000FF |
| blue1 | rgb(0,0,255) | #0000FF |
| blue2 | rgb(0,0,238) | #0000EE |
| blue3 | rgb(0,0,205) | #0000CD |
| blue4 | rgb(0,0,139) | #00008B |
| MediumBlue | rgb(0,0,205) | #0000CD |
| DarkBlue | rgb(0,0,139) | #00008B |
| MidnightBlue | rgb(25,25,112) | #191970 |
| NavyBlue | rgb(0,0,128) | #000080 |
| RoyalBlue | rgb(65,105,225) | #4169E1 |
| RoyalBlue1 | rgb(72,118,255) | #4876FF |
| RoyalBlue2 | rgb(67,110,238) | #436EEE |
| RoyalBlue3 | rgb(58,95,205) | #3A5FCD |
| RoyalBlue4 | rgb(39,64,139) | #27408B |
| CornflowerBlue | rgb(100,149,237) | #6495ED |
| LightSteelBlue | rgb(176,196,222) | #B0C4DE |
| LightSteelBlue1 | rgb(202,225,255) | #CAE1FF |
| LightSteelBlue2 | rgb(188,210,238) | #BCD2EE |
| LightSteelBlue3 | rgb(162,181,205) | #A2B5CD |
| LightSteelBlue4 | rgb(110,123,139) | #6E7B8B |
| SlateGray1 | rgb(198,226,255) | #C6E2FF |
| SlateGray2 | rgb(185,211,238) | #B9D3EE |
| SlateGray3 | rgb(159,182,205) | #9FB6CD |
| SlateGray4 | rgb(108,123,139) | #6C7B8B |
| LightSlateGray | rgb(119,136,153) | #778899 |
| SlateGray | rgb(112,128,144) | #708090 |
| DodgerBlue | rgb(30,144,255) | #1E90FF |
| DodgerBlue1 | rgb(30,144,255) | #1E90FF |
| DodgerBlue2 | rgb(28,134,238) | #1C86EE |
| DodgerBlue3 | rgb(24,116,205) | #1874CD |
| DodgerBlue4 | rgb(16,78,139) | #104E8B |
| AliceBlue | rgb(240,248,255) | #F0F8FF |
| SteelBlue | rgb(70,130,180) | #4682B4 |
| SteelBlue1 | rgb(99,184,255) | #63B8FF |
| SteelBlue2 | rgb(92,172,238) | #5CACEE |
| SteelBlue3 | rgb(79,148,205) | #4F94CD |
| SteelBlue4 | rgb(54,100,139) | #36648B |
| SkyBlue | rgb(135,206,235) | #87CEEB |
| SkyBlue1 | rgb(135,206,255) | #87CEFF |
| SkyBlue2 | rgb(126,192,238) | #7EC0EE |
| SkyBlue3 | rgb(108,166,205) | #6CA6CD |
| SkyBlue4 | rgb(74,112,139) | #4A708B |
| LightSkyBlue | rgb(135,206,250) | #87CEFA |
| LightSkyBlue1 | rgb(176,226,255) | #B0E2FF |
| LightSkyBlue2 | rgb(164,211,238) | #A4D3EE |
| LightSkyBlue3 | rgb(141,182,205) | #8DB6CD |
| LightSkyBlue4 | rgb(96,123,139) | #607B8B |
| LightBlue3 | rgb(154,192,205) | #9AC0CD |
| DeepSkyBlue | rgb(0,191,255) | #00BFFF |
| DeepSkyBlue1 | rgb(0,191,255) | #00BFFF |
| DeepSkyBlue2 | rgb(0,178,238) | #00B2EE |
| DeepSkyBlue3 | rgb(0,154,205) | #009ACD |
| DeepSkyBlue4 | rgb(0,104,139) | #00688B |
| LightBlue | rgb(173,216,230) | #ADD8E6 |
| LightBlue1 | rgb(191,239,255) | #BFEFFF |
| LightBlue2 | rgb(178,223,238) | #B2DFEE |
| LightBlue4 | rgb(104,131,139) | #68838B |
| PowderBlue | rgb(176,224,230) | #B0E0E6 |
| CadetBlue | rgb(95,158,160) | #5F9EA0 |
| CadetBlue1 | rgb(152,245,255) | #98F5FF |
| CadetBlue2 | rgb(142,229,238) | #8EE5EE |
| CadetBlue3 | rgb(122,197,205) | #7AC5CD |
| CadetBlue4 | rgb(83,134,139) | #53868B |
| turquoise1 | rgb(0,245,255) | #00F5FF |
| turquoise2 | rgb(0,229,238) | #00E5EE |
| turquoise3 | rgb(0,197,205) | #00C5CD |
| turquoise4 | rgb(0,134,139) | #00868B |
| DarkTurquoise | rgb(0,206,209) | #00CED1 |
| azure | rgb(240,255,255) | #F0FFFF |
| azure1 | rgb(240,255,255) | #F0FFFF |
| azure2 | rgb(224,238,238) | #E0EEEE |
| azure3 | rgb(193,205,205) | #C1CDCD |
| azure4 | rgb(131,139,139) | #838B8B |
| LightCyan | rgb(224,255,255) | #E0FFFF |
| LightCyan1 | rgb(224,255,255) | #E0FFFF |
| LightCyan2 | rgb(209,238,238) | #D1EEEE |
| LightCyan3 | rgb(180,205,205) | #B4CDCD |
| LightCyan4 | rgb(122,139,139) | #7A8B8B |
| turquoise | rgb(64,224,208) | #40E0D0 |
| PaleTurquoise | rgb(175,238,238) | #AFEEEE |
| PaleTurquoise1 | rgb(187,255,255) | #BBFFFF |
| PaleTurquoise2 | rgb(174,238,238) | #AEEEEE |
| PaleTurquoise3 | rgb(150,205,205) | #96CDCD |
| PaleTurquoise4 | rgb(102,139,139) | #668B8B |
| MediumTurquoise | rgb(72,209,204) | #48D1CC |
| DarkSlateGray | rgb(47,79,79) | #2F4F4F |
| DarkSlateGray1 | rgb(151,255,255) | #97FFFF |
| DarkSlateGray2 | rgb(141,238,238) | #8DEEEE |
| DarkSlateGray3 | rgb(121,205,205) | #79CDCD |
| DarkSlateGray4 | rgb(82,139,139) | #528B8B |
| aqua | rgb(0,255,255) | #00FFFF |
| cyan | rgb(0,255,255) | #00FFFF |
| cyan1 | rgb(0,255,255) | #00FFFF |
| cyan2 | rgb(0,238,238) | #00EEEE |
| cyan3 | rgb(0,205,205) | #00CDCD |
| cyan4 | rgb(0,139,139) | #008B8B |
| DarkCyan | rgb(0,139,139) | #008B8B |
| teal | rgb(0,128,128) | #008080 |
| LightSeaGreen | rgb(32,178,170) | #20B2AA |
| aquamarine | rgb(127,255,212) | #7FFFD4 |
| aquamarine1 | rgb(127,255,212) | #7FFFD4 |
| aquamarine2 | rgb(118,238,198) | #76EEC6 |
| aquamarine3 | rgb(102,205,170) | #66CDAA |
| aquamarine4 | rgb(69,139,116) | #458B74 |
| MediumAquamarine | rgb(102,205,170) | #66CDAA |
| MintCream | rgb(245,255,250) | #F5FFFA |
| SpringGreen | rgb(0,255,127) | #00FF7F |
| SpringGreen1 | rgb(0,255,127) | #00FF7F |
| SpringGreen2 | rgb(0,238,118) | #00EE76 |
| SpringGreen3 | rgb(0,205,102) | #00CD66 |
| SpringGreen4 | rgb(0,139,69) | #008B45 |
| MediumSpringGreen | rgb(0,250,154) | #00FA9A |
| SeaGreen | rgb(46,139,87) | #2E8B57 |
| SeaGreen1 | rgb(84,255,159) | #54FF9F |
| SeaGreen2 | rgb(78,238,148) | #4EEE94 |
| SeaGreen3 | rgb(67,205,128) | #43CD80 |
| SeaGreen4 | rgb(46,139,87) | #2E8B57 |
| MediumSeaGreen | rgb(60,179,113) | #3CB371 |
| DarkSeaGreen1 | rgb(193,255,193) | #C1FFC1 |
| DarkSeaGreen2 | rgb(180,238,180) | #B4EEB4 |
| MediumForestGreen | rgb(50,129,75) | #32814B |
| honeydew | rgb(240,255,240) | #F0FFF0 |
| honeydew1 | rgb(240,255,240) | #F0FFF0 |
| honeydew2 | rgb(224,238,224) | #E0EEE0 |
| honeydew3 | rgb(193,205,193) | #C1CDC1 |
| honeydew4 | rgb(131,139,131) | #838B83 |
| PaleGreen | rgb(152,251,152) | #98FB98 |
| PaleGreen1 | rgb(154,255,154) | #9AFF9A |
| PaleGreen2 | rgb(144,238,144) | #90EE90 |
| LightGreen | rgb(144,238,144) | #90EE90 |
| PaleGreen3 | rgb(124,205,124) | #7CCD7C |
| DarkSeaGreen | rgb(143,188,143) | #8FBC8F |
| DarkSeaGreen3 | rgb(155,205,155) | #9BCD9B |
| DarkSeaGreen4 | rgb(105,139,105) | #698B69 |
| green1 | rgb(0,255,0) | #00FF00 |
| lime | rgb(0,255,0) | #00FF00 |
| LimeGreen | rgb(50,205,50) | #32CD32 |
| green2 | rgb(0,238,0) | #00EE00 |
| PaleGreen4 | rgb(84,139,84) | #548B54 |
| green3 | rgb(0,205,0) | #00CD00 |
| ForestGreen | rgb(34,139,34) | #228B22 |
| green4 | rgb(0,139,0) | #008B00 |
| green | rgb(0,128,0) | #008000 |
| DarkGreen | rgb(0,100,0) | #006400 |
| LawnGreen | rgb(124,252,0) | #7CFC00 |
| chartreuse | rgb(127,255,0) | #7FFF00 |
| chartreuse1 | rgb(127,255,0) | #7FFF00 |
| chartreuse2 | rgb(118,238,0) | #76EE00 |
| chartreuse3 | rgb(102,205,0) | #66CD00 |
| chartreuse4 | rgb(69,139,0) | #458B00 |
| GreenYellow | rgb(173,255,47) | #ADFF2F |
| DarkOliveGreen3 | rgb(162,205,90) | #A2CD5A |
| DarkOliveGreen1 | rgb(202,255,112) | #CAFF70 |
| DarkOliveGreen2 | rgb(188,238,104) | #BCEE68 |
| DarkOliveGreen4 | rgb(110,139,61) | #6E8B3D |
| DarkOliveGreen | rgb(85,107,47) | #556B2F |
| OliveDrab | rgb(107,142,35) | #6B8E23 |
| OliveDrab1 | rgb(192,255,62) | #C0FF3E |
| OliveDrab2 | rgb(179,238,58) | #B3EE3A |
| OliveDrab3 | rgb(154,205,50) | #9ACD32 |
| YellowGreen | rgb(154,205,50) | #9ACD32 |
| OliveDrab4 | rgb(105,139,34) | #698B22 |
| ivory | rgb(255,255,240) | #FFFFF0 |
| ivory1 | rgb(255,255,240) | #FFFFF0 |
| LightYellow | rgb(255,255,224) | #FFFFE0 |
| LightYellow1 | rgb(255,255,224) | #FFFFE0 |
| beige | rgb(245,245,220) | #F5F5DC |
| ivory2 | rgb(238,238,224) | #EEEEE0 |
| LightGoldenrodYellow | rgb(250,250,210) | #FAFAD2 |
| LightYellow2 | rgb(238,238,209) | #EEEED1 |
| ivory3 | rgb(205,205,193) | #CDCDC1 |
| LightYellow3 | rgb(205,205,180) | #CDCDB4 |
| ivory4 | rgb(139,139,131) | #8B8B83 |
| LightYellow4 | rgb(139,139,122) | #8B8B7A |
| yellow | rgb(255,255,0) | #FFFF00 |
| yellow1 | rgb(255,255,0) | #FFFF00 |
| yellow2 | rgb(238,238,0) | #EEEE00 |
| yellow3 | rgb(205,205,0) | #CDCD00 |
| yellow4 | rgb(139,139,0) | #8B8B00 |
| olive | rgb(128,128,0) | #808000 |
| DarkKhaki | rgb(189,183,107) | #BDB76B |
| khaki2 | rgb(238,230,133) | #EEE685 |
| LemonChiffon4 | rgb(139,137,112) | #8B8970 |
| khaki1 | rgb(255,246,143) | #FFF68F |
| khaki3 | rgb(205,198,115) | #CDC673 |
| khaki4 | rgb(139,134,78) | #8B864E |
| PaleGoldenrod | rgb(238,232,170) | #EEE8AA |
| LemonChiffon | rgb(255,250,205) | #FFFACD |
| LemonChiffon1 | rgb(255,250,205) | #FFFACD |
| khaki | rgb(240,230,140) | #F0E68C |
| LemonChiffon3 | rgb(205,201,165) | #CDC9A5 |
| LemonChiffon2 | rgb(238,233,191) | #EEE9BF |
| MediumGoldenRod | rgb(209,193,102) | #D1C166 |
| cornsilk4 | rgb(139,136,120) | #8B8878 |
| gold | rgb(255,215,0) | #FFD700 |
| gold1 | rgb(255,215,0) | #FFD700 |
| gold2 | rgb(238,201,0) | #EEC900 |
| gold3 | rgb(205,173,0) | #CDAD00 |
| gold4 | rgb(139,117,0) | #8B7500 |
| LightGoldenrod | rgb(238,221,130) | #EEDD82 |
| LightGoldenrod4 | rgb(139,129,76) | #8B814C |
| LightGoldenrod1 | rgb(255,236,139) | #FFEC8B |
| LightGoldenrod3 | rgb(205,190,112) | #CDBE70 |
| LightGoldenrod2 | rgb(238,220,130) | #EEDC82 |
| cornsilk3 | rgb(205,200,177) | #CDC8B1 |
| cornsilk2 | rgb(238,232,205) | #EEE8CD |
| cornsilk | rgb(255,248,220) | #FFF8DC |
| cornsilk1 | rgb(255,248,220) | #FFF8DC |
| goldenrod | rgb(218,165,32) | #DAA520 |
| goldenrod1 | rgb(255,193,37) | #FFC125 |
| goldenrod2 | rgb(238,180,34) | #EEB422 |
| goldenrod3 | rgb(205,155,29) | #CD9B1D |
| goldenrod4 | rgb(139,105,20) | #8B6914 |
| DarkGoldenrod | rgb(184,134,11) | #B8860B |
| DarkGoldenrod1 | rgb(255,185,15) | #FFB90F |
| DarkGoldenrod2 | rgb(238,173,14) | #EEAD0E |
| DarkGoldenrod3 | rgb(205,149,12) | #CD950C |
| DarkGoldenrod4 | rgb(139,101,8) | #8B6508 |
| FloralWhite | rgb(255,250,240) | #FFFAF0 |
| wheat2 | rgb(238,216,174) | #EED8AE |
| OldLace | rgb(253,245,230) | #FDF5E6 |
| wheat | rgb(245,222,179) | #F5DEB3 |
| wheat1 | rgb(255,231,186) | #FFE7BA |
| wheat3 | rgb(205,186,150) | #CDBA96 |
| orange | rgb(255,165,0) | #FFA500 |
| orange1 | rgb(255,165,0) | #FFA500 |
| orange2 | rgb(238,154,0) | #EE9A00 |
| orange3 | rgb(205,133,0) | #CD8500 |
| orange4 | rgb(139,90,0) | #8B5A00 |
| wheat4 | rgb(139,126,102) | #8B7E66 |
| moccasin | rgb(255,228,181) | #FFE4B5 |
| PapayaWhip | rgb(255,239,213) | #FFEFD5 |
| NavajoWhite3 | rgb(205,179,139) | #CDB38B |
| BlanchedAlmond | rgb(255,235,205) | #FFEBCD |
| NavajoWhite | rgb(255,222,173) | #FFDEAD |
| NavajoWhite1 | rgb(255,222,173) | #FFDEAD |
| NavajoWhite2 | rgb(238,207,161) | #EECFA1 |
| NavajoWhite4 | rgb(139,121,94) | #8B795E |
| AntiqueWhite4 | rgb(139,131,120) | #8B8378 |
| AntiqueWhite | rgb(250,235,215) | #FAEBD7 |
| tan | rgb(210,180,140) | #D2B48C |
| bisque4 | rgb(139,125,107) | #8B7D6B |
| burlywood | rgb(222,184,135) | #DEB887 |
| AntiqueWhite2 | rgb(238,223,204) | #EEDFCC |
| burlywood1 | rgb(255,211,155) | #FFD39B |
| burlywood3 | rgb(205,170,125) | #CDAA7D |
| burlywood2 | rgb(238,197,145) | #EEC591 |
| AntiqueWhite1 | rgb(255,239,219) | #FFEFDB |
| burlywood4 | rgb(139,115,85) | #8B7355 |
| AntiqueWhite3 | rgb(205,192,176) | #CDC0B0 |
| DarkOrange | rgb(255,140,0) | #FF8C00 |
| bisque2 | rgb(238,213,183) | #EED5B7 |
| bisque | rgb(255,228,196) | #FFE4C4 |
| bisque1 | rgb(255,228,196) | #FFE4C4 |
| bisque3 | rgb(205,183,158) | #CDB79E |
| DarkOrange1 | rgb(255,127,0) | #FF7F00 |
| linen | rgb(250,240,230) | #FAF0E6 |
| DarkOrange2 | rgb(238,118,0) | #EE7600 |
| DarkOrange3 | rgb(205,102,0) | #CD6600 |
| DarkOrange4 | rgb(139,69,0) | #8B4500 |
| peru | rgb(205,133,63) | #CD853F |
| tan1 | rgb(255,165,79) | #FFA54F |
| tan2 | rgb(238,154,73) | #EE9A49 |
| tan3 | rgb(205,133,63) | #CD853F |
| tan4 | rgb(139,90,43) | #8B5A2B |
| PeachPuff | rgb(255,218,185) | #FFDAB9 |
| PeachPuff1 | rgb(255,218,185) | #FFDAB9 |
| PeachPuff4 | rgb(139,119,101) | #8B7765 |
| PeachPuff2 | rgb(238,203,173) | #EECBAD |
| PeachPuff3 | rgb(205,175,149) | #CDAF95 |
| SandyBrown | rgb(244,164,96) | #F4A460 |
| seashell4 | rgb(139,134,130) | #8B8682 |
| seashell2 | rgb(238,229,222) | #EEE5DE |
| seashell3 | rgb(205,197,191) | #CDC5BF |
| chocolate | rgb(210,105,30) | #D2691E |
| chocolate1 | rgb(255,127,36) | #FF7F24 |
| chocolate2 | rgb(238,118,33) | #EE7621 |
| chocolate3 | rgb(205,102,29) | #CD661D |
| chocolate4 | rgb(139,69,19) | #8B4513 |
| SaddleBrown | rgb(139,69,19) | #8B4513 |
| seashell | rgb(255,245,238) | #FFF5EE |
| seashell1 | rgb(255,245,238) | #FFF5EE |
| sienna4 | rgb(139,71,38) | #8B4726 |
| sienna | rgb(160,82,45) | #A0522D |
| sienna1 | rgb(255,130,71) | #FF8247 |
| sienna2 | rgb(238,121,66) | #EE7942 |
| sienna3 | rgb(205,104,57) | #CD6839 |
| LightSalmon3 | rgb(205,129,98) | #CD8162 |
| LightSalmon | rgb(255,160,122) | #FFA07A |
| LightSalmon1 | rgb(255,160,122) | #FFA07A |
| LightSalmon4 | rgb(139,87,66) | #8B5742 |
| LightSalmon2 | rgb(238,149,114) | #EE9572 |
| coral | rgb(255,127,80) | #FF7F50 |
| OrangeRed | rgb(255,69,0) | #FF4500 |
| OrangeRed1 | rgb(255,69,0) | #FF4500 |
| OrangeRed2 | rgb(238,64,0) | #EE4000 |
| OrangeRed3 | rgb(205,55,0) | #CD3700 |
| OrangeRed4 | rgb(139,37,0) | #8B2500 |
| DarkSalmon | rgb(233,150,122) | #E9967A |
| salmon1 | rgb(255,140,105) | #FF8C69 |
| salmon2 | rgb(238,130,98) | #EE8262 |
| salmon3 | rgb(205,112,84) | #CD7054 |
| salmon4 | rgb(139,76,57) | #8B4C39 |
| coral1 | rgb(255,114,86) | #FF7256 |
| coral2 | rgb(238,106,80) | #EE6A50 |
| coral3 | rgb(205,91,69) | #CD5B45 |
| coral4 | rgb(139,62,47) | #8B3E2F |
| tomato4 | rgb(139,54,38) | #8B3626 |
| tomato | rgb(255,99,71) | #FF6347 |
| tomato1 | rgb(255,99,71) | #FF6347 |
| tomato2 | rgb(238,92,66) | #EE5C42 |
| tomato3 | rgb(205,79,57) | #CD4F39 |
| MistyRose4 | rgb(139,125,123) | #8B7D7B |
| MistyRose2 | rgb(238,213,210) | #EED5D2 |
| MistyRose | rgb(255,228,225) | #FFE4E1 |
| MistyRose1 | rgb(255,228,225) | #FFE4E1 |
| salmon | rgb(250,128,114) | #FA8072 |
| MistyRose3 | rgb(205,183,181) | #CDB7B5 |
| white | rgb(255,255,255) | #FFFFFF |
| gray100 | rgb(255,255,255) | #FFFFFF |
| grey100 | rgb(255,255,255) | #FFFFFF |
| grey100 | rgb(255,255,255) | #FFFFFF |
| gray99 | rgb(252,252,252) | #FCFCFC |
| grey99 | rgb(252,252,252) | #FCFCFC |
| gray98 | rgb(250,250,250) | #FAFAFA |
| grey98 | rgb(250,250,250) | #FAFAFA |
| gray97 | rgb(247,247,247) | #F7F7F7 |
| grey97 | rgb(247,247,247) | #F7F7F7 |
| gray96 | rgb(245,245,245) | #F5F5F5 |
| grey96 | rgb(245,245,245) | #F5F5F5 |
| WhiteSmoke | rgb(245,245,245) | #F5F5F5 |
| gray95 | rgb(242,242,242) | #F2F2F2 |
| grey95 | rgb(242,242,242) | #F2F2F2 |
| gray94 | rgb(240,240,240) | #F0F0F0 |
| grey94 | rgb(240,240,240) | #F0F0F0 |
| gray93 | rgb(237,237,237) | #EDEDED |
| grey93 | rgb(237,237,237) | #EDEDED |
| gray92 | rgb(235,235,235) | #EBEBEB |
| grey92 | rgb(235,235,235) | #EBEBEB |
| gray91 | rgb(232,232,232) | #E8E8E8 |
| grey91 | rgb(232,232,232) | #E8E8E8 |
| gray90 | rgb(229,229,229) | #E5E5E5 |
| grey90 | rgb(229,229,229) | #E5E5E5 |
| gray89 | rgb(227,227,227) | #E3E3E3 |
| grey89 | rgb(227,227,227) | #E3E3E3 |
| gray88 | rgb(224,224,224) | #E0E0E0 |
| grey88 | rgb(224,224,224) | #E0E0E0 |
| gray87 | rgb(222,222,222) | #DEDEDE |
| grey87 | rgb(222,222,222) | #DEDEDE |
| gainsboro | rgb(220,220,220) | #DCDCDC |
| gray86 | rgb(219,219,219) | #DBDBDB |
| grey86 | rgb(219,219,219) | #DBDBDB |
| gray85 | rgb(217,217,217) | #D9D9D9 |
| grey85 | rgb(217,217,217) | #D9D9D9 |
| gray84 | rgb(214,214,214) | #D6D6D6 |
| grey84 | rgb(214,214,214) | #D6D6D6 |
| gray83 | rgb(212,212,212) | #D4D4D4 |
| grey83 | rgb(212,212,212) | #D4D4D4 |
| LightGray | rgb(211,211,211) | #D3D3D3 |
| LightGrey | rgb(211,211,211) | #D3D3D3 |
| gray82 | rgb(209,209,209) | #D1D1D1 |
| grey82 | rgb(209,209,209) | #D1D1D1 |
| gray81 | rgb(207,207,207) | #CFCFCF |
| grey81 | rgb(207,207,207) | #CFCFCF |
| gray80 | rgb(204,204,204) | #CCCCCC |
| grey80 | rgb(204,204,204) | #CCCCCC |
| gray79 | rgb(201,201,201) | #C9C9C9 |
| grey79 | rgb(201,201,201) | #C9C9C9 |
| gray78 | rgb(199,199,199) | #C7C7C7 |
| grey78 | rgb(199,199,199) | #C7C7C7 |
| gray77 | rgb(196,196,196) | #C4C4C4 |
| grey77 | rgb(196,196,196) | #C4C4C4 |
| gray76 | rgb(194,194,194) | #C2C2C2 |
| grey76 | rgb(194,194,194) | #C2C2C2 |
| silver | rgb(192,192,192) | #C0C0C0 |
| gray75 | rgb(191,191,191) | #BFBFBF |
| grey75 | rgb(191,191,191) | #BFBFBF |
| gray74 | rgb(189,189,189) | #BDBDBD |
| grey74 | rgb(189,189,189) | #BDBDBD |
| gray73 | rgb(186,186,186) | #BABABA |
| grey73 | rgb(186,186,186) | #BABABA |
| gray72 | rgb(184,184,184) | #B8B8B8 |
| grey72 | rgb(184,184,184) | #B8B8B8 |
| gray71 | rgb(181,181,181) | #B5B5B5 |
| grey71 | rgb(181,181,181) | #B5B5B5 |
| gray70 | rgb(179,179,179) | #B3B3B3 |
| grey70 | rgb(179,179,179) | #B3B3B3 |
| gray69 | rgb(176,176,176) | #B0B0B0 |
| grey69 | rgb(176,176,176) | #B0B0B0 |
| gray68 | rgb(173,173,173) | #ADADAD |
| grey68 | rgb(173,173,173) | #ADADAD |
| gray67 | rgb(171,171,171) | #ABABAB |
| grey67 | rgb(171,171,171) | #ABABAB |
| DarkGray | rgb(169,169,169) | #A9A9A9 |
| DarkGrey | rgb(169,169,169) | #A9A9A9 |
| gray66 | rgb(168,168,168) | #A8A8A8 |
| grey66 | rgb(168,168,168) | #A8A8A8 |
| gray65 | rgb(166,166,166) | #A6A6A6 |
| grey65 | rgb(166,166,166) | #A6A6A6 |
| gray64 | rgb(163,163,163) | #A3A3A3 |
| grey64 | rgb(163,163,163) | #A3A3A3 |
| gray63 | rgb(161,161,161) | #A1A1A1 |
| grey63 | rgb(161,161,161) | #A1A1A1 |
| gray62 | rgb(158,158,158) | #9E9E9E |
| grey62 | rgb(158,158,158) | #9E9E9E |
| gray61 | rgb(156,156,156) | #9C9C9C |
| grey61 | rgb(156,156,156) | #9C9C9C |
| gray60 | rgb(153,153,153) | #999999 |
| grey60 | rgb(153,153,153) | #999999 |
| gray59 | rgb(150,150,150) | #969696 |
| grey59 | rgb(150,150,150) | #969696 |
| gray58 | rgb(148,148,148) | #949494 |
| grey58 | rgb(148,148,148) | #949494 |
| gray57 | rgb(145,145,145) | #919191 |
| grey57 | rgb(145,145,145) | #919191 |
| gray56 | rgb(143,143,143) | #8F8F8F |
| grey56 | rgb(143,143,143) | #8F8F8F |
| gray55 | rgb(140,140,140) | #8C8C8C |
| grey55 | rgb(140,140,140) | #8C8C8C |
| gray54 | rgb(138,138,138) | #8A8A8A |
| grey54 | rgb(138,138,138) | #8A8A8A |
| gray53 | rgb(135,135,135) | #878787 |
| grey53 | rgb(135,135,135) | #878787 |
| gray52 | rgb(133,133,133) | #858585 |
| gray51 | rgb(130,130,130) | #828282 |
| fractal | rgb(128,128,128) | #808080 |
| gray50 | rgb(127,127,127) | #7F7F7F |
| gray | rgb(126,126,126) | #7E7E7E |
| grey49 | rgb(125,125,125) | #7D7D7D |
| gray47 | rgb(120,120,120) | #787878 |
| gray46 | rgb(117,117,117) | #757575 |
| gray45 | rgb(115,115,115) | #737373 |
| gray44 | rgb(112,112,112) | #707070 |
| gray43 | rgb(110,110,110) | #6E6E6E |
| gray42 | rgb(107,107,107) | #6B6B6B |
| DimGrey | rgb(105,105,105) | #696969 |
| gray39 | rgb(99,99,99) | #636363 |
| gray38 | rgb(97,97,97) | #616161 |
| gray37 | rgb(94,94,94) | #5E5E5E |
| gray36 | rgb(92,92,92) | #5C5C5C |
| gray35 | rgb(89,89,89) | #595959 |
| gray34 | rgb(87,87,87) | #575757 |
| gray33 | rgb(84,84,84) | #545454 |
| gray32 | rgb(82,82,82) | #525252 |
| gray31 | rgb(79,79,79) | #4F4F4F |
| gray30 | rgb(77,77,77) | #4D4D4D |
| gray29 | rgb(74,74,74) | #4A4A4A |
| gray28 | rgb(71,71,71) | #474747 |
| gray27 | rgb(69,69,69) | #454545 |
| gray26 | rgb(66,66,66) | #424242 |
| gray25 | rgb(64,64,64) | #404040 |
| gray24 | rgb(61,61,61) | #3D3D3D |
| gray23 | rgb(59,59,59) | #3B3B3B |
| gray22 | rgb(56,56,56) | #383838 |
| gray21 | rgb(54,54,54) | #363636 |
| gray20 | rgb(51,51,51) | #333333 |
| gray19 | rgb(48,48,48) | #303030 |
| gray18 | rgb(46,46,46) | #2E2E2E |
| gray17 | rgb(43,43,43) | #2B2B2B |
| gray16 | rgb(41,41,41) | #292929 |
| gray15 | rgb(38,38,38) | #262626 |
| gray14 | rgb(36,36,36) | #242424 |
| gray13 | rgb(33,33,33) | #212121 |
| gray12 | rgb(31,31,31) | #1F1F1F |
| gray11 | rgb(28,28,28) | #1C1C1C |
| gray10 | rgb(26,26,26) | #1A1A1A |
| gray9 | rgb(23,23,23) | #171717 |
| gray8 | rgb(20,20,20) | #141414 |
| gray7 | rgb(18,18,18) | #121212 |
| gray6 | rgb(15,15,15) | #0F0F0F |
| gray5 | rgb(13,13,13) | #0D0D0D |
| gray4 | rgb(10,10,10) | #0A0A0A |
| gray3 | rgb(8,8,8) | #080808 |
| gray2 | rgb(5,5,5) | #050505 |
| gray1 | rgb(3,3,3) | #030303 |
| black | rgb(0,0,0) | #000000 |
| gray0 | rgb(0,0,0) | #000000 |
| opaque | rgb(0,0,0) | #000000 |
| none | rgba(0,0,0,0.0) | #00000000 |
| transparent | rgba(0,0,0,0.0) | #00000000 |

## sips (Mac)

Usage: `sips [flags] inputFile [--out outputFile]`

Image modification flags:

| Flag | Meaning |
| --- | --- |
| `-s key value` | Set the value for a `key` (see table below for the available keys and acceptable values). |
| `-r degreesCW` | Rotate an image several degrees clockwise. |
| `-f option` | Flip the image using one of the following two options: horizontal or vertical. |
| `-c pixelsH pixelsW` | Crop image to fit specified size. `pixelsH` indicates the new height in number of pixels, `pixelsW` indicates the new width in number of pixels. |
| `-z pixelsH pixelsW` | Resample image at specified size. Image aspect ratio may be altered. `pixelsH` indicate the new height in number of pixels, `pixelsW` indicate the new width in number of pixels. |
| `-Z pixelsWH` | Resample image so height and width aren't greater than specified. |
| `--resampleWidth pixelsW` | Resample image to specified width. `pixelsW` indicate the new width in number of pixels. |
| `--resampleHeight pixelsH` | Resample image to specified height. `pixelsH` indicate the new height in number of pixels. |
| `-o` | Optimize color for sharing. |
| `-p pixelsH pixelsW` | Add padding to the image. Use `--padColor hexcolor` to select the padding color as hexadecimal number. |

If you want to modify one image to match the properties of another image (for example have one image match the height of another image), you can use the flag `-g key` or `--getProperty key` on the image that you want to match. Where `key` is one of the following properties:

| Profile property keys | Usage |
| --- | --- |
| `dpiHeight` | Height in dpi (printer dots per inch). |
| `dpiWidth` | Width in dpi (printer dots per inch). |
| `pixelHeight` | Height in number of pixels. |
| `pixelWidth` | Width in number of pixels. |
| `format` | Image format. Acceptable values for this key: `jpeg`, `tiff`, `png`, `gif`, `jp2`, `pict`, `bmp`, `qtif`, `psd`, `sgi`, `tga`, `pdf`. |
| `formatOptions` | Quality of the new image. Acceptable values for this key: `low`, `normal`, `high`, `best`, or some percentage. |
| `samplesPerPixel` | Samples per pixel. |
| `bitsPerSample` | Bits per sample. |
| `software` | Software use to create the image. |
| `description` | Description. |
| `copyright` | Copyright. |
| `version` | Version. |
| `platform` | Platform where file was created. |
| `quality` | Acceptable values for this key: normal, draft, best. |
| `renderingIntent` | Acceptable values for this key: perceptual, relative, saturation, absolute. |
| `creator` | Creator of the file. |

For the examples below I will be using the following image, taken from the following article, which I published long time ago: [link to article](https://pubmed.ncbi.nlm.nih.gov/29113642/).

![original](img/nihms909531f2.jpg)

Convert `AutismArticle1.png` to pdf.

```bash
$ sips -s format pdf AutismArticle1.png --out AutismArticle1.pdf
/Users/monica/Desktop/Backup/images_presentations/AutismArticle1.png
/Users/monica/Desktop/Backup/images_presentations/AutismArticle1.pdf
```

Rotate `AutismArticle1.png` 45 degrees clock-wise.

```bash
$ sips -r 45 AutismArticle1.png --out test.png
/Users/monica/Desktop/Backup/images_presentations/AutismArticle1.png
/Users/monica/Desktop/Backup/images_presentations/test.png
```

Result image:

![rotated1](img/rotated1.png)

Rotate `AutismArticle1.png` 45 degrees counter-clock-wise.

```bash
$ sips -r -45 AutismArticle1.png --out test.png
/Users/monica/Desktop/Backup/images_presentations/AutismArticle1.png
/Users/monica/Desktop/Backup/images_presentations/test2.png
```

Result image:

![rotated2](img/rotated2.png)

Flip `AutismArticle1.png` horizontally.

```bash
$ sips -f horizontal AutismArticle1.png --out test.png
/Users/monica/Desktop/Backup/images_presentations/AutismArticle1.png
/Users/monica/Desktop/Backup/images_presentations/test.png
```

Result image:

![flipped](img/flipped.png)

Flip `AutismArticle1.png` vertically.

```bash
$ sips -f vertical AutismArticle1.png --out test.png
/Users/monica/Desktop/Backup/images_presentations/AutismArticle1.png
/Users/monica/Desktop/Backup/images_presentations/test.png
```

Result image:

![flipped2](img/flipped2.png)

Crop `AutismArticle1.png` to fit a new size that be 1/4 of its original height and 1/4 of its original weight:

The first step is to obtain the current width and height using `sips` with the flags `--getProperty pixelWidth` and `--getProperty pixelHeight`. Then, divide the two numbers by four. And finally use `sips` with the `-c` flag to crop the file.

```bash
$ sips --getProperty pixelHeight AutismArticle1.png
/Users/monica/Desktop/Backup/images_presentations/AutismArticle1.png
  pixelHeight: 440
$ sips --getProperty pixelWidth AutismArticle1.png
/Users/monica/Desktop/Backup/images_presentations/AutismArticle1.png
  pixelWidth: 727
$ echo "440/4" | bc -l
110.00000000000000000000
$ echo "727/4" | bc -l
181.75000000000000000000
$ sips -c 110 181 AutismArticle1.png --out test.png
/Users/monica/Desktop/Backup/images_presentations/AutismArticle1.png
  /Users/monica/Desktop/Backup/images_presentations/test.png
```

Result image:

![cropped](img/cropped.png)

Resample image to 110x181:

```bash
$ sips -z 110 181 AutismArticle1.png --out test.png
/Users/monica/Desktop/Backup/images_presentations/AutismArticle1.png
  /Users/monica/Desktop/Backup/images_presentations/test.png
$ sips --getProperty pixelHeight test.png
/Users/monica/Desktop/Backup/images_presentations/test.png
  pixelHeight: 110
$ sips --getProperty pixelWidth test.png
/Users/monica/Desktop/Backup/images_presentations/test.png
  pixelWidth: 181
```

Result image:

![resampled](img/resampled.png)

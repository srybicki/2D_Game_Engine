/**************************************************************************************************
 *
 *    File: colour.js
 * 
 * Version: 1.0
 *
 *  Author: Simon Rybicki (SSR)
 * 
 *    Date: 26/08/19
 * 
 *    Info: Colour component of the engine. 
 *          Used to colour a text object.
 *          Store a wide range of colours in HEX and RGB format.
 */

// List of colours in HEX format.
// https://htmlcolorcodes.com/
let COLOUR_HEX = {
    WHITE:   '#FFFFFF',
    SILVER:  '#C0C0C0',
    GREY:    '#808080',
    BLACK:   '#000000',
    RED:     '#FF0000',
    MAROON:  '#800000',
    YELLOW:  '#FFFF00',
    OLIVE:   '#808000',
    LIME:    '#00FF00',
    GREEN:   '#008000',
    AQUA:    '#00FFFF',
    TEAL:    '#008080',
    BLUE:    '#0000FF',
    NAVY:    '#000080',
    FUCHSIA: '#FF00FF',
    PURPLE:  '#800080',
}

// List of colours in RGB format.
let COLOUR_RGB = {
    WHITE:   { r:255, g:255, b:255 },
    SILVER:  { r:192, g:192, b:192 },
    GREY:    { r:128, g:128, b:128 },
    BLACK:   { r:0,   g:0,   b:0   },
    RED:     { r:255, g:0,   b:0   },
    MAROON:  { r:128, g:0,   b:0   },
    YELLOW:  { r:255, g:255, b:0   },
    OLIVE:   { r:128, g:128, b:0   },
    LIME:    { r:0,   g:255, b:0   },
    GREEN:   { r:0,   g:128, b:0   },
    AQUA:    { r:0,   g:255, b:255 },
    TEAL:    { r:0,   g:128, b:128 },
    BLUE:    { r:0,   g:0,   b:255 },
    NAVY:    { r:0,   g:0,   b:128 },
    FUCHSIA: { r:255, g:0,   b:255 },
    PURPLE:  { r:128, g:0,   b:128 }
};
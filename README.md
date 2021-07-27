# randomgen

A set of generators meant to be used mainly in RPGs. Generators are available in Polish (as default) and English. For now, only Star Trek technobabble generator was created.

## Technobabble generator

Generates a short phrase using template: 
- en: `<action> <descriptor> <source> <effect> <device>`, for example: "extend non-linear Neutrino flux catalyst"
- pl: `<action> <descriptor> <device> <effect> <source>`, for example: "przekierować wtórny przedłużacz przesunięcia tetrionowego"

I converted it from existing "analog" 5d20 generator I've got from a friend (sorry, I don't have a source to link) and translated into Polish. Then I added some words to Polish version and enhanced it with possibility to have plural form in two places.
Generator outputs only raw string because assumption is that it will be used as an endpoint and it will be requested that will decorate it. 

At the moment, the generator is available at: http://random.forseti.pl/technobabble

The language is chosen based on:
1. query string's `lang` argument
2. acceptLanguages
3. if neither is specified or specifies neither "pl" nor "en" then default of "pl" is used

Thus, you can access it in three ways:
- http://random.forseti.pl/technobabble (Polish)
- http://random.forseti.pl/technobabble?lang=pl (Polish)
- http://random.forseti.pl/technobabble?lang=en (English)

If you can see ways to improve or expand it, please add an issue. Of course, pull requests are welcome too.

<template>
    <v-container
        fill-height
        fluid
        class="ma-0 pa-0 align-start d-flex flex-grow-1 flex-column"
    >
        <!-- Secondary toolbar -->
        <v-app-bar
            height="32"
            :style="'width: 100%; max-height:32px'"
            class="navblend"
            :class="!!darkmode ? '' : 'darken-1'"
            elevation="2"
        >
        </v-app-bar>

        <div class="d-flex flex-grow-1 flex-row width-100">
            <div
                class="navblend"
                style="
                height: 100%; 
                top: 0px; 
                width: 48px;
                border-right-color: rgba(0, 0, 0, 0.12) !important;
                border-right-style: solid;
                border-right-width: 1px;
                "
                :class="!!darkmode ? '' : 'darken-1'"
            >
                <template v-for="(submenu, index) in menu.submenus">
                    <v-list
                        :key="'submenu-'+index"
                        nav
                        dense
                        class="navblend pa-0 ma-0"
                        :class="!!darkmode ? '' : 'darken-1'"
                    >
                        <v-list-item 
                            v-for="item in submenu"
                            :key="item.name"
                            link
                            color="primary"
                            class="pa-auto ma-0 page-button"
                            :class="item.name == page ? 'page-current' : ''"
                            :ripple="false"
                            style="height: 48px; width: 48px; border-radius:0px !important;"
                            @click="!menu.select(item.name)"
                        >
                            <v-tooltip right :open-delay="1000" content-class="no-transparancy">
                                <template v-slot:activator="{ on, attrs }">
                                    <v-list-item-icon
                                        v-bind="attrs"
                                        v-on="on"
                                        class="pt-2"
                                        :class="item.name == page ? 'ml-0' : 'ml-1'"
                                    >
                                        <v-icon :class="item.name == page ? 'primary--text' : ''">{{item.icon}}</v-icon>
                                    </v-list-item-icon>
                                </template>
                                <span>{{item.name}}</span>
                            </v-tooltip>
                        </v-list-item>
                    </v-list>
                    <v-divider v-if="index != 'switch'" :key="'divider-'+index"></v-divider>
                </template>
            </div>

            <div class="fill-height flex-grow-1 flex-column ma-5" :class="!page || page == 'Home' ? 'd-flex' : 'd-none'" >
                <h2>Welcome to Ready Set Dice!</h2>
                <p>
                    The webapplication that aims to make your in-person games just a bit easier!<br/>
                    All <b>100% free</b>, supporting you and your players with <b>real-time data, combat tracker, encounter builder, search function (creatures/spells) & more!</b> <br/>
                    Got any questions/issues?
                    <v-btn
                        @click="discord()"
                        class="mt-1 body-1 d-flex font-weight-bold white--text "
                        color="#5662f6"
                        width="280"
                    >
                        <v-avatar size="28" class="ml-n2" tile>
                            <v-icon small>mdi-discord</v-icon>
                        </v-avatar>
                        <span class="px-2">Join us on Discord!</span>
                    </v-btn>
                    <v-btn
                        @click="pc()"
                        class="mt-1 body-1 d-flex font-weight-bold white--text"
                        color="primary"
                        width="280"
                    >
                        <v-avatar size="28" class="ml-n2" tile>
                            <v-icon small>mdi-controller-classic</v-icon>
                        </v-avatar>
                        <span class="px-2">To the PC Dashboard!</span>
                    </v-btn>
                    <v-btn
                        @click="gm()"
                        class="mt-1 body-1 d-flex font-weight-bold white--text"
                        color="main"
                        width="280"
                    >
                        <v-avatar size="28" class="ml-n2" tile>
                            <v-icon small>mdi-crown</v-icon>
                        </v-avatar>
                        <span class="px-2">To the GM Dashboard!</span>
                    </v-btn>
                </p>
                <h3>Previews of the application</h3>
                <div class="mx-5 pa-5">
                    <v-carousel 
                        v-model="currentImage"
                    >
                        <v-carousel-item
                            v-for="(image, i) in previewImages"
                            :key="image"
                        >
                            <v-img
                                :lazy-src="`https://readysetdice.com/img/${image}-lazy.png`"
                                :src="`https://readysetdice.com/img/${image}.png`"
                            ></v-img>
                        </v-carousel-item>
                    </v-carousel>
                </div>

            </div>

            <div class="fill-height flex-grow-1 flex-column ma-5" :class="!!page && page == 'About' ? 'd-flex' : 'd-none'" >
                <h2>About</h2>
                <p>
                    This project was started as I found I was lacking certain tools & wanted to try and see what I could build on my own.<br />
                    Ultimately, I'm hoping to develop something that the community at large can use in their games, to make it a little easier (and possible more fun!) to run PF2e games.
                </p>
                <p>
                    Anyone wishing to contact me can do so on Discord or Reddit.<br />
                    Please report any bugs found (including how you found them!) on Discord!<br />
                </p>
                <h2>Patrons!</h2>
                <p>
                    Special thanks to the fine folks over on Patreon for supporting this project. <br />
                </p>
                <p>
                    <h3>Contributors</h3>
                    <ul class="no-list-style">
                        <li><v-icon color="yellow darken-1">mdi-star</v-icon><v-icon color="yellow darken-1">mdi-star</v-icon><v-icon color="yellow darken-1">mdi-star</v-icon>&nbsp;<span class="mt-1 font-weight-bold">AceOfOtters</span>&nbsp;<v-icon color="yellow darken-1">mdi-star</v-icon><v-icon color="yellow darken-1">mdi-star</v-icon><v-icon color="yellow darken-1">mdi-star</v-icon></li>
                    </ul><br />
                    <h3>Old Contributors</h3>
                    <ul class="no-list-style">
                        <li><v-icon color="yellow darken-1">mdi-star</v-icon><span class="mt-1">Polyhedral</span><v-icon color="yellow darken-1">mdi-star</v-icon></li>
                        <li><v-icon color="yellow darken-1">mdi-star</v-icon><span class="mt-1">Anja Blaszczyk</span><v-icon color="yellow darken-1">mdi-star</v-icon></li>
                    </ul>
                </p>
                <h2>Special thanks</h2>
                <p>
                    This section is reserved for everyone who made this website possible!
                </p>
                <p>
                    <ul class="no-list-style">
                        <li><v-icon>mdi-circle-small</v-icon>For allowing me to use their data, many thanks to the great people developing the <a href="https://gitlab.com/hooking/foundry-vtt---pathfinder-2e">Foundry VTT Pathfinder 2e dataset!</a></li>
                        <li><v-icon>mdi-circle-small</v-icon>For allowing me to use some of her design UX ideas, I want to give a shout-out to Ashley of <a href="https://pathfinderdashboard.com/">Pathfinder 2e Dashboard!</a></li>
                    </ul>
                </p>
            </div>

            <div class="fill-height flex-grow-1 flex-column ma-5" :class="!!page && page == 'License' ? 'd-flex' : 'd-none'" >
                <div class="page-sheet alt-scrollbar">
                    <div 
                        v-for="(license, li) in licences"
                        :key="li"
                    >
                        <div>
                            <div>
                                <h2>{{license.title}}</h2>
                            </div>
                            <div
                                v-for="(ltext,i) in license.parts"
                                :key="i"
                            >
                                <b>{{ltext.head}}</b>
                                <p v-if="ltext.body">{{ltext.body}}</p>
                                <div 
                                v-for="(part,j) in ltext.parts"
                                :key="j"
                                >
                                    <p class="mb-0">
                                        {{part}}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div v-html="licenseHTML">
                    </div>
                </div>
            </div>
        </div>
    </v-container>

</template>

<script>
export default {
    data() {
        return {
            currentImage: 0,
            previewImages: [
                'gm-combat-view',
                'gm-encounter-builder',
                'gm-party-view',
                'gm-search-menu',
                'gm-tutorial-page',
            ],
            menu: {
                selected: (name) => {
                    return this.page == name
                },
                submenus: {
                    main: [
                        {name: 'Home', icon: 'mdi-home'},
                    ],
                    extra: [
                        {name: 'About', icon: 'mdi-information-outline'},
                        {name: 'License', icon: 'mdi-license'},
                    ],
                    switch: [
                        {name: 'PC Dashboard', icon: 'mdi-controller-classic'},
                        {name: 'GM Dashboard', icon: 'mdi-crown'},
                    ],
                },
                select: (name) => {
                    if (name == 'Player') {
                        window.location.href = "https://pc.readysetdice.com";
                    } else if (name == 'GM') {
                        window.location.href = "https://gm.readysetdice.com";
                    } else {
                        this.$store.dispatch('setPage', name)
                    }
                },
            },
            licences: [
                {
                    title: 'Community Use Policy',
                    parts: [
                    {
                        head: "",
                        body: "This website uses trademarks and/or copyrights owned by Paizo Publishing, LLC, which are used under Paizo's Community Use Policy. We are expressly prohibited from charging you to use or access this content. This website is not published, endorsed, or specifically approved by Paizo Publishing. For more information about Paizo's Community Use Policy, please visit paizo.com/communityuse. For more information about Paizo Publishing and Paizo products, please visit paizo.com."
                    },
                    ]
                },
                {
                    title: 'Open Game License',
                    parts: [
                    {
                        head: "",
                        body: 'The following text is the property of Wizards of the Coast, Inc. and is Copyright 2000 Wizards of the Coast, Inc ("Wizards"). All Rights Reserved.'
                    },
                    {
                        head: "1. Definitions:",
                        parts: [
                        '(a)"Contributors" means the copyright and/or trademark owners who have contributed Open Game Content;',
                        '(b)"Derivative Material" means copyrighted material including derivative works and translations (including into other computer languages), potation, modification, correction, addition, extension, upgrade, improvement, compilation, abridgment or other form in which an existing work may be recast, transformed or adapted;',
                        '(c) "Distribute" means to reproduce, license, rent, lease, sell, broadcast, publicly display, transmit or otherwise distribute;',
                        '(d)"Open Game Content" means the game mechanic and includes the methods, procedures, processes and routines to the extent such content does not embody the Product Identity and is an enhancement over the prior art and any additional content clearly identified as Open Game Content by the Contributor, and means any work covered by this License, including translations and derivative works under copyright law, but specifically excludes Product Identity.',
                        '(e) "Product Identity" means product and product line names, logos and identifying marks including trade dress; artifacts; creatures characters; stories, storylines, plots, thematic elements, dialogue, incidents, language, artwork, symbols, designs, depictions, likenesses, formats, poses, concepts, themes and graphic, photographic and other visual or audio representations; names and descriptions of characters, spells, enchantments, personalities, teams, personas, likenesses and special abilities; places, locations, environments, creatures, equipment, magical or supernatural abilities or effects, logos, symbols, or graphic designs; and any other trademark or registered trademark clearly identified as Product identity by the owner of the Product Identity, and which specifically excludes the Open Game Content;',
                        '(f) "Trademark" means the logos, names, mark, sign, motto, designs that are used by a Contributor to identify itself or its products or the associated products contributed to the Open Game License by the Contributor (g) "Use", "Used" or "Using" means to use, Distribute, copy, edit, format, modify, translate and otherwise create Derivative Material of Open Game Content.',
                        '(h) "You" or "Your" means the licensee in terms of this agreement.'
                        ]
                    },
                    {
                        head: "2. The License:",
                        body: "This License applies to any Open Game Content that contains a notice indicating that the Open Game Content may only be Used under and in terms of this License. You must affix such a notice to any Open Game Content that you Use. No terms may be added to or subtracted from this License except as described by the License itself. No other terms or conditions may be applied to any Open Game Content distributed using this License.",
                    },
                    {
                        head: "3. Offer and Acceptance:",
                        body: "By Using the Open Game Content You indicate Your acceptance of the terms of this License.",
                    },
                    {
                        head: "4. Grant and Consideration:",
                        body: "In consideration for agreeing to use this License, the Contributors grant You a perpetual, worldwide, royalty-free, non-exclusive license with the exact terms of this License to Use, the Open Game Content.",
                    },
                    {
                        head: "5. Representation of Authority to Contribute:",
                        body: "If You are contributing original material as Open Game Content, You represent that Your Contributions are Your original creation and/or You have sufficient rights to grant the rights conveyed by this License.",
                    },
                    {
                        head: "6. Notice of License Copyright:",
                        body: "You must update the COPYRIGHT NOTICE portion of this License to include the exact text of the COPYRIGHT NOTICE of any Open Game Content You are copying, modifying or distributing, and You must add the title, the copyright date, and the copyright holder's name to the COPYRIGHT NOTICE of any original Open Game Content you Distribute.",
                    },
                    {
                        head: "7. Use of Product Identity:",
                        body: "You agree not to Use any Product Identity, including as an indication as to compatibility, except as expressly licensed in another, independent Agreement with the owner of each element of that Product Identity. You agree not to indicate compatibility or co-adaptability with any Trademark or Registered Trademark in conjunction with a work containing Open Game Content except as expressly licensed in another, independent Agreement with the owner of such Trademark or Registered Trademark. The use of any Product Identity in Open Game Content does not constitute a challenge to the ownership of that Product Identity. The owner of any Product Identity used in Open Game Content shall retain all rights, title and interest in and to that Product Identity.",
                    },
                    {
                        head: "8. Identification:",
                        body: "If you distribute Open Game Content You must clearly indicate which portions of the work that you are distributing are Open Game Content.",
                    },
                    {
                        head: "9. Updating the License:",
                        body: "Wizards or its designated Agents may publish updated versions of this License. You may use any authorized version of this License to copy, modify and distribute any Open Game Content originally distributed under any version of this License.",
                    },
                    {
                        head: "10. Copy of this License:",
                        body: "You MUST include a copy of this License with every copy of the Open Game Content You Distribute.",
                    },
                    {
                        head: "11. Use of Contributor Credits:",
                        body: "You may not market or advertise the Open Game Content using the name of any Contributor unless You have written permission from the Contributor to do so.",
                    },
                    {
                        head: "12. Inability to Comply:",
                        body: "If it is impossible for You to comply with any of the terms of this License with respect to some or all of the Open Game Content due to statute, judicial order, or governmental regulation then You may not Use any Open Game Material so affected.",
                    },
                    {
                        head: "13. Termination:",
                        body: "This License will terminate automatically if You fail to comply with all terms herein and fail to cure such breach within 30 days of becoming aware of the breach. All sublicenses shall survive the termination of this License.",
                    },
                    {
                        head: "14. Reformation:",
                        body: "If any provision of this License is held to be unenforceable, such provision shall be reformed only to the extent necessary to make it enforceable.",
                    },
                    {
                        head: "15. COPYRIGHT NOTICE",
                    },
                    {
                        head: "Open Game License v 1.0 Copyright 2000, Wizards of the Coast, Inc.:",
                        body: "",
                    },
                    {
                        head: "System Reference Document. :",
                        body: "Copyright 2000. Wizards of the Coast, Inc; Authors: Jonathan Tweet, Monte Cook, Skip Williams, based on material by E. Gary Gygax and Dave Arneson.",
                    },
                    ],
                }
            ],
            licenseHTML: `<h3>Game-icons.net</h3>
<p>Game-icons created by <a href="https://game-icons.net">game-icons.net</a> used under the <a href="https://creativecommons.org/licenses/by/3.0/">CC BY 3.0</a>.</p>
<p>Icons used in this application are made by the following authors:</p>
<ul>
<li>Lorc, http://lorcblog.blogspot.com</li>
<li>Delapouite, https://delapouite.com</li>
<li>John Colburn, http://ninmunanmu.com</li>
<li>Felbrigg, http://blackdogofdoom.blogspot.co.uk</li>
<li>John Redman, http://www.uniquedicetowers.com</li>
<li>Carl Olsen, https://twitter.com/unstoppableCarl</li>
<li>Sbed, http://opengameart.org/content/95-game-icons</li>
<li>PriorBlue</li>
<li>Willdabeast, http://wjbstories.blogspot.com</li>
<li>Viscious Speed, http://viscious-speed.deviantart.com - CC0</li>
<li>Lord Berandas, http://berandas.deviantart.com</li>
<li>Irongamer, http://ecesisllc.wix.com/home</li>
<li>HeavenlyDog, http://www.gnomosygoblins.blogspot.com</li>
<li>Lucas</li>
<li>Faithtoken, http://fungustoken.deviantart.com</li>
<li>Skoll</li>
<li>Andy Meneely, http://www.se.rit.edu/~andy/</li>
<li>Cathelineau</li>
<li>Kier Heyl</li>
<li>Aussiesim</li>
<li>Sparker, http://citizenparker.com</li>
<li>Zeromancer - CC0</li>
<li>Rihlsul</li>
<li>Quoting</li>
<li>Guard13007, https://guard13007.com</li>
<li>DarkZaitzev, http://darkzaitzev.deviantart.com</li>
<li>SpencerDub</li>
<li>GeneralAce135</li>
<li>Zajkonur</li>
<li>Catsu</li>
<li>Starseeker</li>
<li>Pepijn Poolman</li>
<li>Pierre Leducq</li>
<li>Caro Asercion</li>
</ul>
<br />
<h3>Core Books</h3>
<b>Pathfinder Core Rulebook (Second Edition) </b><span>© 2019, Paizo Inc.; Designers: Logan Bonner, Jason Bulmahn, Stephen Radney-MacFarland, and Mark Seifter.</span><br/>
<b>Pathfinder Gamemastery Guide </b><span>© 2020, Paizo Inc.; Authors: Alexander Augunas, Jesse Benner, John Bennett, Logan Bonner, Clinton J. Boomer, Jason Bulmahn, James Case, Paris Crenshaw, Jesse Decker, Robert N. Emerson, Eleanor Ferron, Jaym Gates, Matthew Goetz, T.H. Gulliver, Kev Hamilton, Sasha Laranoa Harving, BJ Hensley, Vanessa Hoskins, Brian R. James, Jason LeMaitre, Lyz Liddell, Luis Loza, Colm Lundberg, Ron Lundeen, Stephen Radney-MacFarland, Jessica Redekop, Alistair Rigg, Mark Seifter, Owen K.C. Stephens, Amber Stewart, Christina Stiles, Landon Winkler, and Linda Zayas-Palmer.</span><br/>
<b>Pathfinder Advanced Player Guide </b><span>© 2020, Paizo Inc.; Authors: Logan Bonner, Lyz Liddell, and Mark Seifter.</span><br/>
<b>Pathfinder Beginner Box </b><span>© 2020, Paizo Inc.; Authors: Logan Bonner, Jason Bulmahn, Lyz Liddell, Mark Seifter</span><br/>
<br />
<h3>Bestiary</h3>
<b>Daemon, Guardian from the Tome of Horrors Complete </b><span>© 2011, Necromancer Games, Inc., published and distributed by Frog God Games; Author: Scott Greene, based on original material by Ian McDowall.</span><br/>
<b>Dark Creeper from the Tome of Horrors Complete </b><span>© 2011, Necromancer Games, Inc., published and distributed by Frog God Games; Author: Scott Greene, based on original material by Rik Shepard.</span><br/>
<b>Dark Stalker from the Tome of Horrors Complete </b><span>© 2011, Necromancer Games, Inc., published and distributed by Frog God Games; Author: Scott Greene, based on original material by Simon Muth.</span><br/>
<b>Dragon, Faerie from the Tome of Horrors Complete </b><span>© 2011, Necromancer Games, Inc., published and distributed by Frog God Games; Author: Scott Greene, based on original material by Brian Jaeger and Gary Gygax.</span><br/>
<b>Genie, Marid from the Tome of Horrors Complete </b><span>© 2011, Necromancer Games, Inc., published and distributed by Frog God Games; Author: Scott Greene, based on original material by Gary Gygax.</span><br/>
<b>Mite from the Tome of Horrors Complete </b><span>© 2011, Necromancer Games, Inc., published and distributed by Frog God Games; Author: Scott Greene, based on original material by Ian Livingstone and Mark Barnes.</span><br/>
<b>Pathfinder Bestiary (Second Edition) </b><span>© 2019, Paizo Inc.; Authors: Alexander Augunas, Logan Bonner, Jason Bulmahn, John Compton, Paris Crenshaw, Adam Daigle, Eleanor Ferron, Leo Glass, Thurston Hillman, James Jacobs, Jason Keeley, Lyz Liddell, Ron Lundeen, Robert G. McCreary, Tim Nightengale, Stephen Radney-MacFarland, Alex Riggs, David N. Ross, Michael Sayre, Mark Seifter, Chris S. Sims, Jeffrey Swank, Jason Tondro, Tonya Woldridge, and Linda Zayas-Palmer.</span><br/>
<br />
<h3>Bestiary 2</h3>
<b>Angel, Monadic Deva from the Tome of Horrors Complete </b><span>© 2011, Necromancer Games, Inc., published and distributed by Frog God Games; Author: Scott Greene, based on original material by Gary Gygax.</span><br/>
<b>Angel, Movanic Deva from the Tome of Horrors Complete </b><span>© 2011, Necromancer Games, Inc., published and distributed by Frog God Games; Author: Scott Greene, based on original material by Gary Gygax.</span><br/>
<b>Aurumvorax from the Tome of Horrors Complete </b><span>© 2011, Necromancer Games, Inc., published and distributed by Frog God Games; Author: Scott Greene, based on original material by Gary Gygax.</span><br/>
<b>Basidirond from the Tome of Horrors Complete </b><span>© 2011, Necromancer Games, Inc., published and distributed by Frog God Games; Author: Scott Greene, based on original material by Gary Gygax.</span><br/>
<b>Blindheim from the Tome of Horrors Complete </b><span>© 2011, Necromancer Games, Inc., published and distributed by Frog God Games; Author: Scott Greene, based on original material by Roger Musson.</span><br/>
<b>The Book of Fiends </b><span>© 2003, Green Ronin Publishing; Authors: Aaron Loeb, Erik Mona, Chris Pramas, and Robert J. Schwalb.</span><br/>
<b>Armies of the Abyss </b><span>© 2002, Green Ronin Publishing; Authors: Erik Mona and Chris Pramas.</span><br/>
<b>The Avatar's Handbook </b><span>© 2003, Green Ronin Publishing; Authors: Jesse Decker and Chris Thomasson.</span><br/>
<b>Book of the Righteous </b><span>© 2002, Aaron Loeb.</span><br/>
<b>Legions of Hell </b><span>© 2001, Green Ronin Publishing; Author: Chris Pramas.</span><br/>
<b>The Unholy Warrior's Handbook </b><span>© 2003, Green Ronin Publishing; Author: Robert J. Schwalb.</span><br/>
<b>Carbuncle from the Tome of Horrors Complete </b><span>© 2011, Necromancer Games, Inc., published and distributed by Frog God Games; Author: Scott Greene, based on original material by Albie Fiore.</span><br/>
<b>Cave Fisher from the Tome of Horrors Complete </b><span>© 2011, Necromancer Games, Inc., published and distributed by Frog God Games; Author: Scott Greene, based on original material by Lawrence Schick.</span><br/>
<b>Daemon, Derghodaemon from the Tome of Horrors Complete </b><span>© 2011, Necromancer Games, Inc., published and distributed by Frog God Games; Author: Scott Greene, based on original material by Gary Gygax.</span><br/>
<b>Daemon, Piscodaemon from the Tome of Horrors Complete </b><span>© 2011, Necromancer Games, Inc., published and distributed by Frog God Games; Author: Scott Greene, based on original material by Gary Gygax.</span><br/>
<b>Dark Creeper from the Tome of Horrors Complete </b><span>© 2011, Necromancer Games, Inc., published and distributed by Frog God Games; Author: Scott Greene, based on original material by Rik Shepard.</span><br/>
<b>Dark Stalker from the Tome of Horrors Complete </b><span>© 2011, Necromancer Games, Inc., published and distributed by Frog God Games; Author: Scott Greene, based on original material by Simon Muth.</span><br/>
<b>Demon, Nabasu from the Tome of Horrors Complete </b><span>© 2011, Necromancer Games, Inc., published and distributed by Frog God Games; Author: Scott Greene, based on original material by Gary Gygax.</span><br/>
<b>Demon, Shadow from the Tome of Horrors Complete </b><span>© 2011, Necromancer Games, Inc., published and distributed by Frog God Games; Author: Scott Greene, based on original material by Neville White.</span><br/>
<b>Dracolisk from the Tome of Horrors Complete </b><span>© 2011, Necromancer Games, Inc., published and distributed by Frog God Games; Author: Scott Greene, based on original material by Gary Gygax.</span><br/>
<b>Froghemoth from the Tome of Horrors Complete </b><span>© 2011, Necromancer Games, Inc., published and distributed by Frog God Games; Author: Scott Greene, based on original material by Gary Gygax.</span><br/>
<b>Genie, Marid from the Tome of Horrors Complete </b><span>© 2011, Necromancer Games, Inc., published and distributed by Frog God Games; Author: Scott Greene, based on original material by Gary Gygax.</span><br/>
<b>Grippli from the Tome of Horrors Complete </b><span>© 2011, Necromancer Games, Inc., published and distributed by Frog God Games; Author: Scott Greene, based on original material by Gary Gygax.</span><br/>
<b>Korred from the Tome of Horrors Complete </b><span>© 2011, Necromancer Games, Inc., published and distributed by Frog God Games; Author: Scott Greene, based on original material by Gary Gygax.</span><br/>
<b>Necrophidius from the Tome of Horrors Complete </b><span>© 2011, Necromancer Games, Inc., published and distributed by Frog God Games; Author: Scott Greene, based on original material by Simon Tillbrook.</span><br/>
<b>Nereid from the Tome of Horrors Complete </b><span>© 2011, Necromancer Games, Inc., published and distributed by Frog God Games; Author: Scott Greene, based on original material by Gary Gygax.</span><br/>
<b>Quickling from the Tome of Horrors Complete </b><span>© 2011, Necromancer Games, Inc., published and distributed by Frog God Games; Author: Scott Greene, based on original material by Gary Gygax.</span><br/>
<b>Quickwood from the Tome of Horrors Complete </b><span>© 2011, Necromancer Games, Inc., published and distributed by Frog God Games; Author: Scott Greene, based on original material by Gary Gygax.</span><br/>
<b>Scythe Tree from the Tome of Horrors Complete </b><span>© 2011, Necromancer Games, Inc., published and distributed by Frog God Games; Author: Scott Greene.</span><br/>
<b>Skulk from the Tome of Horrors Complete </b><span>© 2011, Necromancer Games, Inc., published and distributed by Frog God Games; Author: Scott Greene, based on original material by Simon Muth.</span><br/>
<b>Soul Eater from the Tome of Horrors Complete </b><span>© 2011, Necromancer Games, Inc., published and distributed by Frog God Games; Author: Scott Greene, based on original material by David Cook.</span><br/>
<b>Troll, Two-Headed from the Tome of Horrors Complete </b><span>© 2011, Necromancer Games, Inc., published and distributed by Frog God Games; Author: Scott Greene, based on original material by Oliver Charles MacDonald.</span><br/>
<b>Yellow Musk Creeper from the Tome of Horrors Complete </b><span>© 2011, Necromancer Games, Inc., published and distributed by Frog God Games; Author: Scott Greene, based on original material by Albie Fiore.</span><br/>
<b>Pathfinder Bestiary 2 (Second Edition) </b><span>© 2020, Paizo Inc.; Authors: Alexander Augunas, Dennis Baker, Jesse Benner, Joseph Blomquist, Logan Bonner, Paris Crenshaw, Adam Daigle, Jesse Decker, Darrin Drader, Brian Duckwitz, Robert N. Emerson, Scott Fernandez, Keith Garrett, Scott Gladstein, Matthew Goodall, T.H. Gulliver, BJ Hensley, Tim Hitchcock, Vanessa Hoskins, James Jacobs, Brian R. James, Jason Keeley, John Laffan, Lyz Liddell, Colm Lundberg, Ron Lundeen, Jason Nelson, Randy Price, Jessica Redekop, Patrick Renie, Alistair Rigg, Alex Riggs, David N. Ross, David Schwartz, Mark Seifter, Amber Stewart, Jeffrey Swank, Russ Taylor, and Jason Tondro.</span><br/>
<br />
<h3>Bestiary 3</h3>
<b>Flumph from the Tome of Horrors Complete </b><span>© 2011, Necromancer Games, Inc., published and distributed by Frog God Games; Author: Scott Greene, based on original material by Ian McDowell and Douglas Naismith.</span><br/>
<b>Pathfinder Bestiary 3 (Second Edition) </b><span>© 2021, Paizo Inc.; Authors: Logan Bonner, James Case, Jessica Catalan, John Compton, Paris Crenshaw, Adam Daigle, Katina Davis, Erik Scott de Bie, Jesse Decker, Brian Duckwitz, Hexe Fey, Keith Garrett, Matthew Goodall, Violet Gray, Alice Grizzle, Steven Hammond, Sasha Laranoa Harving, Joan Hong, James Jacobs, Michelle Jones, Virginia Jordan, TJ Kahn, Mikko Kallio, Jason Keeley, Joshua Kim, Avi Kool, Jeff Lee, Lyz Liddell, Luis Loza, Ron Lundeen, Philippe-Antoine Menard, Patchen Mortimer, Dennis Muldoon, Andrew Mullen, Quinn Murphy, Dave Nelson, Jason Nelson, Samantha Phelan, Stephen Radney-MacFarland, Danita Rambo, Shiv Ramdas, BJ Recio, Jessica Redekop, Mikhail Rekun, Patrick Renie, Alex Riggs, David N. Ross, Simone D. Sallé, Michael Sayre, Mark Seifter, Sen.H.H.S, Abigail Slater, Rodney Sloan, Shay Snow, Pidj Sorensen, Kendra Leigh Speedling, Tan Shao Han, William Thompson, Jason Tondro, Clark Valentine, Ruvaid Virk, Skylar Wall, Andrew White, and Landon Winkler.</span><br/>
<br />
<h3>Secrets of Magic</h3>
<b>Angel, Monadic Deva from the Tome of Horrors Complete </b><span>© 2011, Necromancer Games, Inc., published and distributed by Frog God Games; Author: Scott Greene, based on original material by Gary Gygax.</span><br/>
<b>Angel, Movanic Deva from the Tome of Horrors Complete </b><span>© 2011, Necromancer Games, Inc., published and distributed by Frog God Games; Author: Scott Greene, based on original material by Gary Gygax.</span><br/>
<b>Daemon, Guardian from the Tome of Horrors Complete </b><span>© 2011, Necromancer Games, Inc., published and distributed by Frog God Games; Author: Scott Greene, based on original material by Ian McDowall.</span><br/>
<b>Daemon, Piscodaemon from the Tome of Horrors Complete </b><span>© 2011, Necromancer Games, Inc., published and distributed by Frog God Games; Author: Scott Greene, based on original material by Gary Gygax.</span><br/>
<b>Demon, Nabasu from the Tome of Horrors Complete </b><span>© 2011, Necromancer Games, Inc., published and distributed by Frog God Games; Author: Scott Greene, based on original material by Gary Gygax.</span><br/>
<b>Demon, Shadow from the Tome of Horrors Complete </b><span>© 2011, Necromancer Games, Inc., published and distributed by Frog God Games; Author: Scott Greene, based on original material by Neville White.</span><br/>
<b>Secrets of Magic </b><span>© 2021, Paizo Inc.; Authors: Amirali Attar Olyaee, Kate Baker, Minty Belmont, Logan Bonner, James Case, Jessica Catalan, John Compton, Katina Davis, Jesse Decker, Chris Eng, Eleanor Ferron, Leo Glass, Joan Hong, Vanessa Hoskins, Jason Keeley, Joshua Kim, Luis Loza, Ron Lundeen, Liane Merciel, David N. Ross, Ianara Natividad, Chesley Oxendine, Stephen Radney‑MacFarland, Shiv Ramdas, Mikhail Rekun, Simone D. Sallé, Michael Sayre, Mark Seifter, Sen H.H.S., Shay Snow, Kendra Leigh Speedling, Tan Shao Han, Calliope Lee Taylor, Mari Tokuda, Jason Tondro, Clark Valentine, Ruvaid Virk, Andrew White, Landon Winkler, Tonya Woldridge, and Isis Wozniakowska.</span><br/>
<br />
<h3>Guns and Gears</h3>
<b>Pathfinder Guns & Gears </b><span>© 2021, Paizo Inc.; Authors: Logan Bonner, Jessica Catalan, John Compton, Andrew D. Geels, Steven Hammond, Sen H.H.S., Brent Holtsberry, Jason Keeley, Dustin Knight, Luis Loza, Ron Lundeen, Chris Mastey, Liane Merciel, Jacob W. Michaels, Dave Nelson, Samantha Phelan, Mikhail Rekun, Stephen Radney-MacFarland, Sydney Meeker, Kendra Leigh Speedling, Michael Sayre., Mark Seifter, Andrew Stoeckle, Calliope Lee Taylor, Andrew White, and Scott D. Young.</span><br/>
<br />
<h3>Adventures and Adventure Paths</h3>
<b>Pathfinder Adventure: The Fall of Plaguestone </b><span>© 2019, Paizo Inc.; Author: Jason Bulmahn.</span><br/>
<b>Pathfinder Adventure: The Slithering </b><span>© 2020, Paizo Inc.; Author: Ron Lundeen.</span><br/>
<b>Pathfinder Adventure: Troubles in Otari </b><span>© 2020, Paizo Inc.; Author: Jason Keeley, Liz Liddell, and Ron Lundeen.</span><br/>
<b>Pathfinder Adventure: Malevolence </b><span>© 2021, Paizo Inc.; Author: James Jacobs.</span><br/>
<b>Pathfinder Adventure: Night of the Gray Death </b><span>© 2021, Paizo Inc.; Author: Ron Lundeen.</span><br/>
<b>Pathfinder Adventure: Shadows at Sundown </b><span>© 2022, Paizo Inc.; Author: Unannounced.</span><br/>
<b>Pathfinder Adventure: The Dead God's Hand </b><span>© 2022, Paizo Inc.; Author: Erik Mona</span><br/>
<b>Age of Ashes Player's Guide </b><span>© 2019, Paizo Inc.; Authors: James Jacobs, with Amanda Hamon.</span><br/>
<b>Pathfinder Adventure Path #145: Hellknight Hill </b><span>© 2019, Paizo Inc.; Authors: Amanda Hamon, with Logan Bonner, James Jacobs, and Jason Tondro.</span><br/>
<b>Pathfinder Adventure Path #146: Cult of Cinders </b><span>© 2019, Paizo Inc.; Authors: Eleanor Ferron, with Leo Glass, James Jacobs, Jason Keeley, and Owen KC Stephens.</span><br/>
<b>Pathfinder Adventure Path #147: Tomorrow Must Burn </b><span>© 2019, Paizo Inc.; Authors: Ron Lundeen and Stephanie Lundeen, with Lyz Liddell and James Sutter.</span><br/>
<b>Pathfinder Adventure Path #148: Fires of the Haunted City </b><span>© 2019, Paizo Inc.; Authors: Linda Zayas-Palmer, with Owen K.C. Stephens, James L. Sutter, and Greg Vaughan.</span><br/>
<b>Pathfinder Adventure Path #149: Against the Scarlet Triad </b><span>© 2019, Paizo Inc.; Authors: John Compton, with Tim Nightengale and James L. Sutter.</span><br/>
<b>Pathfinder Adventure Path #150: Broken Promises </b><span>© 2019, Paizo Inc.; Authors: Luis Loza, with James Jacobs, Alex Riggs, and Owen K.C. Stephens.</span><br/>
<b>Extinction Curse Player's Guide </b><span>© 2020, Paizo Inc.; Author: Ron Lundeen.</span><br/>
<b>Pathfinder Adventure Path #151: The Show Must Go On </b><span>© 2020, Paizo Inc.; Authors: Jason Tondro, with Andrew Mullen, Patrick Renie, David N. Ross, and Michael Sayre.</span><br/>
<b>Pathfinder Adventure Path #152: Legacy of the Lost God </b><span>© 2020, Paizo Inc.; Authors: Jenny Jarzabski, with Stephen Glicker, Luis Loza, Ron Lundeen, Andrew Mullen, and David N. Ross.</span><br/>
<b>Pathfinder Adventure Path #153: Life's Long Shadows </b><span>© 2020, Paizo Inc.; Authors: Greg A. Vaughan, with Anthony Bono, Jacob W. Michaels, Andrew Mullen, Patrick Renie, Alex Riggs, Timothy Snow, and Amber Stewart.</span><br/>
<b>Pathfinder Adventure Path #154: Siege of the Dinosaurs </b><span>© 2020, Paizo Inc.; Authors: Kate Baker, with Luis Loza, Andrew Mullen, Jason Nelson, Jennifer Povey, David Schwartz, and Amber Stewart.</span><br/>
<b>Pathfinder Adventure Path #155: Lord of the Black Sands </b><span>© 2020, Paizo Inc.; Authors: Mikko Kallio, with Andrew Mullen, Nathan Reinecke, David Schwartz, and Scott Young.</span><br/>
<b>Pathfinder Adventure Path #156: The Apocalypse Project </b><span>© 2020, Paizo Inc.; Authors: Lyz Liddell, with Mikhail Rekun, Steven Hammond, Kevin Bruan, Andrew Mullen, Patrick Renie, and David N. Ross.</span><br/>
<b>Agents of Edgewatch Player's Guide </b><span>© 2020, Paizo Inc.; Author: Patrick Renie.</span><br/>
<b>Pathfinder Adventure Path #157: Devil at the Dreaming Palace </b><span>© 2020, Paizo Inc.; Authors: James L. Sutter, with Luis Loza, Andrew Mullen, Samantha Phelan, and Patrick Renie.</span><br/>
<b>Pathfinder Adventure Path #158: Sixty Feet Under </b><span>© 2020, Paizo Inc.; Authors: Michael Sayre, Saif Ansari, Leo Glass, Ron Lundeen, Jacob W. Michaels, Patrick Renie, and David N. Ross</span><br/>
<b>Pathfinder Adventure Path #159: All or Nothing </b><span>© 2020, Paizo Inc.; Authors: Jason Keeley</span><br/>
<b>Pathfinder Adventure Path #160: Assault on Hunting Lodge Seven </b><span>© 2020, Paizo Inc.; Authors: Ron Lundeen</span><br/>
<b>Pathfinder Adventure Path #161: Belly of the Black Whale </b><span>© 2020, Paizo Inc.; Authors: Cole Kronewitter</span><br/>
<b>Pathfinder Adventure Path #162: Ruins of the Radiant Siege </b><span>© 2020, Paizo Inc.; Authors: Amber Stewart</span><br/>
<b>Abomination Vaults Player's Guide </b><span>© 2021, Paizo Inc.; Author: Ron Lundeen.</span><br/>
<b>Pathfinder Adventure Path #163: Ruins of Gauntlight </b><span>© 2021, Paizo Inc.; Authors: James Jacobs</span><br/>
<b>Pathfinder Adventure Path #164: Hands of the Devil </b><span>© 2021, Paizo Inc.; Authors: Vanessa Hoskins</span><br/>
<b>Pathfinder Adventure Path #165: Eyes of Empty Death </b><span>© 2021, Paizo Inc.; Authors: Stephen Radney-MacFarland</span><br/>
<b>Fist of the Ruby Phoenix Player's Guide </b><span>© 2021, Paizo Inc.; Author: Patrick Renie.</span><br/>
<b>Pathfinder Adventure Path #166: Despair on Danger Island </b><span>© 2021, Paizo Inc.; Authors: Luis Loza</span><br/>
<b>Pathfinder Adventure Path #167: Ready? Fight! </b><span>© 2021, Paizo Inc.; Authors: Stephen Radney-MacFarland</span><br/>
<b>Pathfinder Adventure Path #168: King of the Mountain </b><span>© 2021, Paizo Inc.; Authors: Vanessa Hoskins</span><br/>
<b>Pathfinder Adventure Path #169: Kindled Magic </b><span>© 2021, Paizo Inc.; Authors: Alexandria Bustion, Eleanor Ferron</span><br/>
<b>Pathfinder Adventure Path #170: Spoken on the Song Wind </b><span>© 2021, Paizo Inc.; Authors: Quinn Murphy</span><br/>
<b>Pathfinder Adventure Path #171: Hurricane's Howl </b><span>© 2021, Paizo Inc.; Authors: Michelle Jones</span><br/>
<b>Pathfinder Adventure Path #172: Secrets of the Temple-City </b><span>© 2021, Paizo Inc.; Authors: Luis Loza</span><br/>
<b>Pathfinder Adventure Path #173: Doorway to the Red Star </b><span>© 2021, Paizo Inc.; Authors: Michael Sayre</span><br/>
<b>Pathfinder Adventure Path #174: Shadows of the Ancients </b><span>© 2021, Paizo Inc.; Authors: Saif Ansari</span><br/>
<b>Strength of Thousands Player's Guide </b><span>© 2021, Paizo Inc.; Author: Ron Lundeen.</span><br/>
<br />
<h3>Society</h3>
<b>Pathfinder Society Quest #1: The Sandstone Secret </b><span>© 2019, Paizo Inc.; Author: Linda Zayas-Palmer.</span><br/>
<b>Pathfinder Society Quest #2: Unforgiving Fire </b><span>© 2019, Paizo Inc.; Author: Leo Glass.</span><br/>
<b>Pathfinder Society Quest #3: Grehunde's Gorget </b><span>© 2019, Paizo Inc.; Author: Kate Baker.</span><br/>
<b>Pathfinder Society Quest #4: Port Peril Pub Crawl </b><span>© 2019, Paizo Inc.; Author: James Case.</span><br/>
<b>Pathfinder Society Quest #5: The Dragon Who Stole Evoking Day </b><span>© 2019, Paizo Inc.; Author: Luis Loza.</span><br/>
<b>Pathfinder Society Quest #6: Archaeology in Aspenthar </b><span>© 2020, Paizo Inc.; Author: Quinn Murphy.</span><br/>
<b>Pathfinder Society Quest #7: A Curious Claim </b><span>© 2020, Paizo Inc.; Author: Dennis Muldoon.</span><br/>
<b>Pathfinder Society Quest #8: Shadows of the Black Soverign </b><span>© 2020, Paizo Inc.; Author: Alexandria Bustion.</span><br/>
<b>Pathfinder Society Quest #9: Wayfinder Origins </b><span>© 2020, Paizo Inc.; Author: Dustin Knight.</span><br/>
<b>Pathfinder Society Quest #10: The Broken Scales </b><span>© 2020, Paizo Inc.; Author: Amber Stewart</span><br/>
<b>Pathfinder Society Quest #11: A Parchment Tree </b><span>© 2020, Paizo Inc.; Author: Carlos Cabrera.</span><br/>
<b>Pathfinder Society Quest #12: Putrid Seeds </b><span>© 2020, Paizo Inc.; Author: Cass Reyfield and James Case.</span><br/>
<b>Pathfinder Society Quest #13: Falcons' Descent </b><span>© 2020, Paizo Inc.; Author: Joshua Hennington.</span><br/>
<b>Pathfinder Society Bounty #1: The Whitefang Wyrm </b><span>© 2020, Paizo Inc.; Author: Michael Sayre</span><br/>
<b>Pathfinder Society Bounty #2: Blood of the Beautiful </b><span>© 2020, Paizo Inc.; Author: Thurston Hillman</span><br/>
<b>Pathfinder Society Bounty #3: Shadow and Scarecrows </b><span>© 2020, Paizo Inc.; Author: Jacob W. Michaels</span><br/>
<b>Pathfinder Society Bounty #4: Cat's Cradle </b><span>© 2020, Paizo Inc.; Author: Hilary Moon Murphy</span><br/>
<b>Pathfinder Society Bounty #5: Witch's Winter Holiday </b><span>© 2020, Paizo Inc.; Author: Patrick Hurley</span><br/>
<b>Pathfinder Society Bounty #6: The Road from Otari </b><span>© 2021, Paizo Inc.; Author: Ron Lundeen</span><br/>
<b>Pathfinder Society Bounty #7: Cleanup Duty </b><span>© 2021, Paizo Inc.; Author: Elizabeth V Nold</span><br/>
<b>Pathfinder Society Bounty #8: The Tireless Path </b><span>© 2021, Paizo Inc.; Author: Ivis K. Flanagan</span><br/>
<b>Pathfinder Society Bounty #9: Fishing in Anthusis </b><span>© 2021, Paizo Inc.; Author: Letterio Mammoliti</span><br/>
<b>Pathfinder Society Bounty #10: Hillcross Roundup </b><span>© 2021, Paizo Inc.; Author: Nicole Heits</span><br/>
<b>Pathfinder Society Bounty #11: Forged Facade </b><span>© 2021, Paizo Inc.; Author: Randal Meyer</span><br/>
<b>Pathfinder Society Bounty #12: Somewhere Below </b><span>© 2021, Paizo Inc.; Author: Kim Frandsen</span><br/>
<b>Pathfinder Society Bounty #13: The Blackwood Abundance </b><span>© 2021, Paizo Inc.; Author: Alex Speidel</span><br/>
<b>Pathfinder Society Bounty #14: The Blackwood Truce </b><span>© 2021, Paizo Inc.; Author: Caryn DiMarco</span><br/>
<b>Pathfinder Society Bounty #15: Treasure Off the Coast </b><span>© 2021, Paizo Inc.; Author: Brent Bowser</span><br/>
<b>Pathfinder Society Bounty #16: Boom Town Betrayal </b><span>© 2021, Paizo Inc.; Author: Logan Harper</span><br/>
<b>Pathfinder Society Bounty #17: Sodden Stories </b><span>© 2021, Paizo Inc.; Author: Michael Bramnik</span><br/>
<b>Pathfinder Society Intro #1: The Second Confirmation </b><span>© 2021, Paizo Inc.; Author: Thurston Hillman.</span><br/>
<b>Pathfinder Society Intro #2: United In Purpose </b><span>© 2021, Paizo Inc.; Author: Brian Duckwitz.</span><br/>
<b>Pathfinder Society Scenario #1-00: Origin of the Open Road </b><span>© 2019, Paizo Inc.; Author: Ron Lundeen.</span><br/>
<b>Pathfinder Society Scenario #1-01: The Absalom Initiation </b><span>© 2019, Paizo Inc.; Author: Lyz Liddell.</span><br/>
<b>Pathfinder Society Scenario #1-02: The Mosquito Witch </b><span>© 2019, Paizo Inc.; Author: Eleanor Ferron.</span><br/>
<b>Pathfinder Society Scenario #1-03: Escaping the Grave </b><span>© 2019, Paizo Inc.; Author: Adrian Ng.</span><br/>
<b>Pathfinder Society Scenario #1-04: Bandits of Immenwood </b><span>© 2019, Paizo Inc.; Author: Scott D. Young.</span><br/>
<b>Pathfinder Society Scenario #1-05: Trailblazers' Bounty </b><span>© 2019, Paizo Inc.; Author: Tineke Bolleman.</span><br/>
<b>Pathfinder Society Scenario #1-06: Lost on the Spirit Road </b><span>© 2019, Paizo Inc.; Author: Christopher Wasko.</span><br/>
<b>Pathfinder Society Scenario #1-07: Flooded King's Court </b><span>© 2019, Paizo Inc.; Author: Brian Duckwitz.</span><br/>
<b>Pathfinder Society Scenario #1-08: Revolutiuon on the Riverside </b><span>© 2019, Paizo Inc.; Author: Kalervo Oikarinen.</span><br/>
<b>Pathfinder Society Scenario #1-09: Star-Crossed Voyages </b><span>© 2019, Paizo Inc.; Author: Lu Pellazar.</span><br/>
<b>Pathfinder Society Scenario #1-10: Tarnbreaker's Trail </b><span>© 2019, Paizo Inc.; Author: Steven Hammond.</span><br/>
<b>Pathfinder Society Scenario #1-11: Flames of Rebellion </b><span>© 2019, Paizo Inc.; Author: Michael Sayre.</span><br/>
<b>Pathfinder Society Scenario #1-12: The Burden of Envy </b><span>© 2020, Paizo Inc.; Author: Lysle Kapp.</span><br/>
<b>Pathfinder Society Scenario #1-13: Devil at the Crossroads </b><span>© 2020, Paizo Inc.; Author: Jenny Jarzabski.</span><br/>
<b>Pathfinder Society Scenario #1-14: Lions of Katapesh </b><span>© 2020, Paizo Inc.; Author: Adam Meyers.</span><br/>
<b>Pathfinder Society Scenario #1-15: The Blooming Catastrophe </b><span>© 2020, Paizo Inc.; Author: Mikhail Rekun.</span><br/>
<b>Pathfinder Society Scenario #1-16: The Perennial Crown Part 1, Opal of Bhopan </b><span>© 2020, Paizo Inc.; Author: Thilo Graf.</span><br/>
<b>Pathfinder Society Scenario #1-17: The Perennial Crown Part 2, The Thorned Monarch </b><span>© 2020, Paizo Inc.; Author: Alex Augunas.</span><br/>
<b>Pathfinder Society Scenario #1-18: Lodge of the Living God </b><span>© 2020, Paizo Inc.; Author: Alex Greenshields.</span><br/>
<b>Pathfinder Society Scenario #1-19: Iolite Squad Alpha </b><span>© 2020, Paizo Inc.; Author: Mike Kimmel.</span><br/>
<b>Pathfinder Society Scenario #1-20: The Lost Legend </b><span>© 2020, Paizo Inc.; Author: Chris Sims.</span><br/>
<b>Pathfinder Society Scenario #1-21: Mistress of the Maze </b><span>© 2020, Paizo Inc.; Author: Christen N. Sowards.</span><br/>
<b>Pathfinder Society Scenario #1-22: Doom of Cassomir </b><span>© 2020, Paizo Inc.; Author: Calder CaDavid.</span><br/>
<b>Pathfinder Society Scenario #1-23: The Star-Crossed Court </b><span>© 2020, Paizo Inc.; Author: Alex Riggs.</span><br/>
<b>Pathfinder Society Scenario #1-24: Lightning Strikes, Stars Fall </b><span>© 2020, Paizo Inc.; Author: Vanessa Hoskins.</span><br/>
<b>Pathfinder Society Scenario #1-25: Grim Symphony </b><span>© 2020, Paizo Inc.; Author: Eleanor Ferron.</span><br/>
<b>Pathfinder Society Scenario #2-00: The King in Thorns (Levels 1-2) </b><span>© 2020, Paizo Inc.; Authors: Kate Baker and Dennis Muldoon</span><br/>
<b>Pathfinder Society Scenario #2-00: The King in Thorns (Levels 3-6) </b><span>© 2020, Paizo Inc.; Authors: Kate Baker and Dennis Muldoon</span><br/>
<b>Pathfinder Society Scenario #2-00: The King in Thorns (Levels 7-8) </b><span>© 2020, Paizo Inc.; Authors: Kate Baker and Dennis Muldoon</span><br/>
<b>Pathfinder Society Scenario #2-01: Citadel of Corruption </b><span>© 2020, Paizo Inc.; Author: Scott D. Young</span><br/>
<b>Pathfinder Society Scenario #2-02: Mountain of Sea and Sky </b><span>© 2020, Paizo Inc.; Authors: Adrian Ng</span><br/>
<b>Pathfinder Society Scenario #2-03: Catastrophe's Spark </b><span>© 2020, Paizo Inc.; Authors: Tineke Bolleman</span><br/>
<b>Pathfinder Society Scenario #2-04: Path of Kings </b><span>© 2020, Paizo Inc.; Authors: Luis Loza</span><br/>
<b>Pathfinder Society Scenario #2-05: Balancing the Scales </b><span>© 2020, Paizo Inc.; Authors: Jessica Catalan</span><br/>
<b>Pathfinder Society Scenario #2-06: The Crashing Wave </b><span>© 2020, Paizo Inc.; Authors: Dustin Knight</span><br/>
<b>Pathfinder Society Scenario #2-07: The Blakros Deception </b><span>© 2020, Paizo Inc.; Authors: Charlie Brooks</span><br/>
<b>Pathfinder Society Scenario #2-08: A Frosty Mug </b><span>© 2020, Paizo Inc.; Authors: Mikhail Rekun</span><br/>
<b>Pathfinder Society Scenario #2-09: The Seven Secrets of Dacilane Academy </b><span>© 2020, Paizo Inc.; Authors: Rigby Bendele</span><br/>
<b>Pathfinder Society Scenario #2-10: In Burning Dawn </b><span>© 2020, Paizo Inc.; Authors: Steven Hammond</span><br/>
<b>Pathfinder Society Scenario #2-11: The Pathfinder Trials </b><span>© 2021, Paizo Inc.; Authors: Sean McGowan</span><br/>
<b>Pathfinder Society Scenario #2-12: Snakes in the Grass </b><span>© 2021, Paizo Inc.; Authors: Lysle Kapp</span><br/>
<b>Pathfinder Society Scenario #2-13: A Gilded Test </b><span>© 2021, Paizo Inc.; Authors: Kalervo Oikarinen</span><br/>
<b>Pathfinder Society Scenario #2-14: Lost in Flames </b><span>© 2021, Paizo Inc.; Authors: Dennis Muldoon</span><br/>
<b>Pathfinder Society Scenario #2-15: A Dirge for Sarkoris </b><span>© 2021, Paizo Inc.; Authors: Kendra Leigh Speedling</span><br/>
<b>Pathfinder Society Scenario #2-16: Freedom for Wishes </b><span>© 2021, Paizo Inc.; Authors: Jessica Redekop</span><br/>
<b>Pathfinder Society Scenario #2-17: Lost Maid of Anactoria </b><span>© 2021, Paizo Inc.; Authors: Scott D. Young</span><br/>
<b>Pathfinder Society Scenario #2-18: The Fanciful March of Urwal </b><span>© 2021, Paizo Inc.; Authors: Hillary Moon Murphy</span><br/>
<b>Pathfinder Society Scenario #2-19: Enter the Pallid Peak </b><span>© 2021, Paizo Inc.; Authors: Jacob W. Michaels</span><br/>
<b>Pathfinder Society Scenario #2-20: Breaking the Storm: Bastion in Embers </b><span>© 2021, Paizo Inc.; Authors: Christopher Wasko</span><br/>
<b>Pathfinder Society Scenario #2-21: In Pursuit of Water </b><span>© 2021, Paizo Inc.; Authors: Matt Duval</span><br/>
<b>Pathfinder Society Scenario #2-22: Breaking the Storm: Excising Ruination </b><span>© 2021, Paizo Inc.; Authors: Nicholas Wasko</span><br/>
<b>Pathfinder Society Scenario #2-23: An Agent's Obligation </b><span>© 2021, Paizo Inc.; Authors: Joshua Hennington</span><br/>
<b>Pathfinder Society Scenario #2-24: Breaking the Storm: Parting Clouds </b><span>© 2021, Paizo Inc.; Authors: Tineke Bolleman</span><br/>
<b>Pathfinder Society Intro: Year of Shattered Sanctuaries </b><span>© 2021, Paizo Inc.; Authors: Mike Kimmel</span><br/>
<b>Pathfinder Society Scenario #3-02: The East Hill Haunting </b><span>© 2021, Paizo Inc.; Authors: Nicole Heits</span><br/>
<b>Pathfinder Society Scenario #3-03: Echoes of Despiration </b><span>© 2021, Paizo Inc.; Authors: Nate Wright</span><br/>
<b>Pathfinder Society Scenario #3-04: The Devil-Wrought Disappearance </b><span>© 2021, Paizo Inc.; Authors: Joseph Blomquist</span><br/>
<b>Pathfinder Society Scenario #3-05: Inheritor's Rite </b><span>© 2021, Paizo Inc.; Authors: Elizabeth V Nold</span><br/>
<b>Pathfinder Society Scenario #3-06: Struck by Shadows </b><span>© 2021, Paizo Inc.; Authors: Luis Loza</span><br/>
<b>Pathfinder Society Scenario #3-07: The Locked Lodge </b><span>© 2021, Paizo Inc.; Authors: Kalervo Oikarinen</span><br/>
<b>Pathfinder Society Scenario #3-08: Foundation's Price </b><span>© 2022, Paizo Inc.; Authors: Letterio Mammoliti</span><br/>
<b>Pathfinder Society Scenario #3-99: Fate in the Future (Levels 1-4) </b><span>© 2021, Paizo Inc.; Authors: Jessica Catalan</span><br/>
<b>Pathfinder Society Scenario #3-99: Fate in the Future (Levels 5-8) </b><span>© 2021, Paizo Inc.; Authors: Jessica Catalan</span><br/>
<b>Pathfinder Society Guide to Play (Second Edition) </b><span>© 2020, The Organized Play Foundation</span><br/>
<br />
<h3>Lost Omens</h3>
<b>Pathfinder Lost Omens Character Guide (Second Edition) </b><span>© 2019, Paizo Inc.; Authors: John Compton, Sasha Lindley Hall, Amanda Hamon, Mike Kimmel, Luis Loza, Ron Lundeen, Matt Morris, Patchen Mortimer, Andrew Mullen, Mikhail Rekun, Micheal Sayre, Owen K.C. Stephens, Isabelle Thorne, and Linda Zayas-Palmer.</span><br/>
<b>Pathfinder Lost Omens Gods & Magic (Second Edition) </b><span>© 2020, Paizo Inc.; Authors: Robert Adducci, Amirali Attar Olyaee, Calder CaDavid, James Case, Adam Daigle, Katina Davis, Leo Glass, Joshua Grinlinton, James Jacobs, Virginia Jordan, Jason Keeley, Jacky Leung, Lyz Liddell, Ron Lundeen, Stephanie Lundeen, Jacob W. Michaels, Matt Morris, Dave Nelson, Samantha Phelan, Jennifer Povey, Jessica Redekop, Nathan Reinecke, Patrick Renie, David N. Ross, Simone D. Sallé, Michael Sayre, David Schwartz, Shahreena Shahrani, Isabelle Thorne, Marc Thuot, Jason Tondro, and Diego Valdez.</span><br/>
<b>Pathfinder Lost Omens World Guide (Second Edition) </b><span>© 2019, Paizo Inc.; Authors: Tanya DePass, James Jacobs, Lyz Liddell, Ron Lundeen, Liane Merciel, Erik Mona, Mark Seifter, James L. Sutter.</span><br/>
<b>Pathfinder Lost Omens Legends (Second Edition) </b><span>© 2020, Paizo Inc.; Authors: Amirali Attar Olyaee, Alexander Augunas, Kate Baker, Jason Bulmahn, Alexandria Bustion, Carlos Cabrera, Calder CaDavid, Jessica Catalan, Natalie Collazo, Ryan Costello, Jr, Greg Diaz, Fabby Garza Marroquín, Jaym Gates, Alice Grizzle, Steven Hammond, Nicolas Hornyak, James Jacobs, Michelle Jones, Kristina Sisto Kindel, Aaron Lascano, Ron Lundeen, Stephanie Lundeen, Sydney Meeker, Liane Merciel, Matt Morris, Patchen Mortimer, Hilary Moon Murphy, Dennis Muldoon, Andrew Mullen, Mikhail Rekun, Michael Sayre, Mark Seifter, Ashton Sperry, Owen K.C. Stephens, and Isabelle Thorne.</span><br/>
<b>Pathfinder Lost Omens Ancestry Guide (Second Edition) </b><span>© 2021, Paizo Inc.; Authors: Calder CaDavid, James Case, Jessica Catalan, Eleanor Ferron, Lyz Liddell, Luis Loza, Ron Lundeen, Patchen Mortimer, Andrew Mullen, Samantha Phelan, Jessica Redekop, Mikhail Rekun, David N. Ross, Mark Seifter, Owen K.C. Stephens, Isabelle Thorne, and Linda Zayas-Palmer.</span><br/>
<b>Pathfinder Lost Omens Azarketi Ancestry Web Supplement </b><span>© 2021, Paizo Inc.; Author: Samantha Phelan.</span><br/>
<b>Pathfinder Lost Omens The Mwangi Expanse </b><span>© 2021, Paizo Inc.; Authors: Laura-Shay Adams, Mariam Ahmad, Jahmal Brown, Misha Bushyager, Alexandria Bustion, Duan Byrd, John Compton, Sarah Davis, Mara Lynn Butler, Kent Hamilton, Amanda Hamon, Sasha Laranoa Harving, Gabriel Hicks, TK Johnson, Michelle Jones, Jason Keeley, Joshua Kim, Travis Lionel, Ron Lundeen, Stephanie Lundeen, Hilary Moon Murphy, Lu Pellazar, Mikhail Rekun, Nate Wright, and Jabari Weathers</span><br/>
<b>Dragon, Faerie from the Tome of Horrors Complete </b><span>© 2011, Necromancer Games, Inc., published and distributed by Frog God Games; Author: Scott Greene, based on original material by Gary Gygax.</span><br/>
<b>Genie, Marid from the Tome of Horrors Complete </b><span>© 2011, Necromancer Games, Inc., published and distributed by Frog God Games; Author: Scott Greene, based on original material by Gary Gygax.</span><br/>
<b>Pathfinder Lost Omens Grand Bazaar </b><span>© 2021, Paizo Inc.; Authors: Tineke Bolleman, Logan Bonner, Jessica Catalan, Dominique Dickey, Dana Ebert, Steven Hammond, Sen H.H.S., Dustin Knight, Avi Kool, Aaron Lascano, Carlos Luna, Ron Lundeen, Sydney Meeker, Randal Meyer, Jacob Michaels, Matt Morris, Andrew Mullen, Ianara Natividad, Dave Nelson, Jessica Redekop, Nathan Reinecke, Erin Roberts, David N. Ross, Simone Sallé, Mark Seifter, Shay Snow, Ashton Sperry, Amber Stewart, Andrew Stoeckle, Isabelle Thorne, Jason Tondro, and Scott D. Young.</span><br/>
<br />
<h3>Free Adventures</h3>
<b>Pathfinder Torment and Legacy: A Pathfinder Second Edition Demo Adventure </b><span>© 2019, Paizo Inc.; Author: Stephen Radney-MacFarland</span><br/>
<b>Pathfinder Free RPG Day Adventure 2020: Little Trouble in Big Absalom </b><span>© 2020, Paizo Inc.; Author: Eleanor Ferron</span><br/>
<b>Pathfinder Free RPG Day Adventure 2021: Threshold of Knowledge </b><span>© 2021, Paizo Inc.; Author: Ron Lundeen, Jabari Weathers</span><br/>
<br />
<h3>One Shots</h3>
<b>Pathfinder One-Shot #1: Sundered Waves </b><span>© 2021, Paizo Inc.; Author: Jason Bulmahn</span><br/>
<b>Pathfinder One-Shot #1: Sundered Waves Pregenerated Characters </b><span>© 2021, Paizo Inc.; Author: Jason Bulmahn</span><br/>
<b>Pathfinder One-Shot #2: Dinner at Lionlodge </b><span>© 2021, Paizo Inc.; Author: James Jacobs</span><br/>
<b>Pathfinder One-Shot #2: Dinner at Lionlodge Pregenerated Characters </b><span>© 2021, Paizo Inc.; Author: James Jacobs</span><br/>
<b>Pathfinder One-Shot #3: Head Shot the Rot </b><span>© 2021, Paizo Inc.; Author: Michael Sayre</span><br/>
<b>Pathfinder One-Shot #3: Head Shot the Rot Pregenerated Characters </b><span>© 2021, Paizo Inc.; Author: Michael Sayre</span><br/>
<br />
<h3>Decks</h3>
<b>Pathfinder Chase Cards Deck </b><span>© 2020, Paizo Inc.; Author: Logan Bonner, Illustrator: Riccardo Rullo.</span><br/>
<b>Pathfinder Critical Fumble Deck </b><span>© 2019, Paizo Inc.; Author: Stephen Radney-MacFarland, Illustrator: Yanis Cardin.</span><br/>
<b>Pathfinder Critical Hit Deck </b><span>© 2019, Paizo Inc.; Author: Stephen Radney-MacFarland, Illustrator: Yanis Cardin.</span><br/>
<b>Pathfinder Hero Point Deck </b><span>© 2021, Paizo Inc.; Author: Jason Bulmahn</span><br/>
<br />
<h3>Paizo Blog</h3>
<b>No-Prep Character: Gristleburst </b><span>© 2021, Paizo Inc.; Author: Ron Lundeen; Illustrator: Valeria Dryzhak.</span><br/>
<b>No-Prep Character: Duhgik </b><span>© 2021, Paizo Inc.; Author: Vanessa Hoskins; Illustrator: Dominik Derow.</span><br/>
<b>No-Prep Character: Wendlyn </b><span>© 2021, Paizo Inc.; Author: Ron Lundeen; Illustrator: Valeria Dryzhak.</span><br/>
<b>No-Prep Character: Zhang Yong </b><span>© 2021, Paizo Inc.; Author: Vanessa Hoskins; Illustrator: Gislaine Avila.</span><br/>
<b>Pathfinder Bestiary 3 Bonus Monster </b><span>© 2021, Paizo Inc.; Chris Sims; Illustrator: Leonardo Borazio.</span><br/>
<b>Pathfinder Encounter: Phinelli's Miracle Elixir </b><span>© 2021, Paizo Inc.; Author Unknown; Illustrator: Alberto Dal Lago.</span><br/>
<b>No-Prep Character: Lisavet </b><span>© 2021, Paizo Inc.; Author: Ron Lundeen; Illustrator: Valeria Dryzhak.</span><br/>
<b>No-Prep Character: Urok </b><span>© 2021, Paizo Inc.; Author: Luis Loza; Illustrator: Gin Skalauskas.</span><br/>
<b>No-Prep Character: Chea </b><span>© 2021, Paizo Inc.; Authors: Eleanor Ferron, Luis Loza; Illustrator: Rashad Pozdnyakov.</span><br/>
<b>No-Prep Character: Eleukas </b><span>© 2021, Paizo Inc.; Author: Ron Lundeen.</span><br/>
<b>GM's Toolkit: Secret Keeper's Mask </b><span>© 2021, Paizo Inc.; Author: Ron Lundeen.</span><br/>
<b>Pathfinder Encounter: Heaving Kobolds </b><span>© 2021, Paizo Inc.; Author: Ron Lundeen.</span><br/>
<b>A Caroling Horse (Of Course. Of Course.) </b><span>© 2021, Paizo Inc.; Author: Eleanor Ferron.</span><br/>
<b>GM's Toolbox: Gravehall </b><span>© 2020, Paizo Inc.; Author: Ron Lundeen.</span><br/>
<b>The Waters of Stone Ring Pond </b><span>© 2020, Paizo Inc.; Author: Ron Lundeen.</span><br/>
<b>Redpitch Alchemy </b><span>© 2020, Paizo Inc.; Author: Ron Lundeen.</span><br/>
<b>Pathfinder Encounter: We Be Zombies! </b><span>© 2020, Paizo Inc.; Author: Ron Lundeen.</span><br/>
<b>No-Prep Character: Morlibint </b><span>© 2020, Paizo Inc.; Author Unknown.</span><br/>
<b>No-Prep Character: Pr'rall </b><span>© 2020, Paizo Inc.; Author: Mark Moreland, Illustrator: Marius Bota.</span><br/>
<b>Foolish Monsters, In April </b><span>© 2020, Paizo Inc.; Authors: James Case, Lyz Liddell, Joan Hong, Avi Kool, John Compton, Michael Sayre, Patrick Renie.</span><br/>
<b>Monster Making </b><span>© 2020, Paizo Inc.; Author: Adam Daigle.</span><br/>
<b>The (Un)Usual Suspects! </b><span>© 2019, Paizo Inc.; Author: Luis Loza; Illustrators: Miguel Regodón, Emile Denis, Firat Solhan, Yanis Cardin.</span><br/>
<br />
<h3>Other</h3>
<b>Pathfinder Special: Fumbus! (Comic Book) </b><span>© 2021, Paizo Inc.; Authors: Jessica Catalan, Michael Sayre, and Fred Van Lente</span><br/>`
        }
    },
    methods: {
        discord() {
            window.location.href = "https://discord.gg/9gdTrgeY3X";
        },
        gm() {
            window.location.href = "https://gm.readysetdice.com";
        },
        pc() {
            window.location.href = "https://pc.readysetdice.com";
        },
    }
}
</script>

<style lang="less" scoped>
.page-current {
    --pageButtonBorder: #064444;
    border-left-color: var(--pageButtonBorder) !important;
    border-left-style: solid;
    border-left-width: 4px;
}

.no-list-style {
  list-style-type: none;
}

.page-sheet {
    overflow-y: scroll;
    overflow-x: clip;
    height: calc(~"100vh - 120px");
    max-height: calc(~"100vh - 120px");
}

</style>
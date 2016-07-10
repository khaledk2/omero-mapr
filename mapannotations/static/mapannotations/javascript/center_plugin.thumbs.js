//   Copyright (C) 2016 University of Dundee & Open Microscopy Environment.
//   All rights reserved.

//   This program is free software: you can redistribute it and/or modify
//   it under the terms of the GNU Affero General Public License as
//   published by the Free Software Foundation, either version 3 of the
//   License, or (at your option) any later version.

//   This program is distributed in the hope that it will be useful,
//   but WITHOUT ANY WARRANTY; without even the implied warranty of
//   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
//   GNU Affero General Public License for more details.

//   You should have received a copy of the GNU Affero General Public License
//   along with this program.  If not, see <http://www.gnu.org/licenses/>.

//   Author: Aleksandra Tarkowska <A(dot)Tarkowska(at)dundee(dot)ac(dot)uk>,

//   Version: 1.0

//   Here we override center_plugin.thumbs.js.html


$(function() {

    var inst = $.jstree.reference('#dataTree');
    var parentNode;     // the currently selected node

    var old_update_thumbnails_panel = window.update_thumbnails_panel;
    window.update_thumbnails_panel = function(event, data) {
        // Get the current selection
        var selected = inst.get_selected(true);
        var dtype = selected[0].type;

        // parent node cannot be "screen", "plate", "acquisition", "project", "image"
        // see ome.tree.js
        var parentTypes = ["screen", "plate", "acquisition", "project", "image"],
            imgNodes = [];
        if (parentTypes.indexOf(dtype) > -1) {
            parentNode = selected[0];
        } else if (dtype !== "image") {
            parentId = undefined;
            OME.clearThumbnailsPanel();
            return;
        } else {
            return old_update_thumbnails_panel(event, data);
        }
    };
});
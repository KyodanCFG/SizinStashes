exports.mod = (mod_info) => {
    logger.logInfo(`   [MOD] Loading: ${mod_info.name} (${mod_info.version}) by ${mod_info.author}`);
    let itemsCache = fileIO.readParsed(global.db.user.cache.items);						    // read from server cache (items)
    let settingsFile = require("../settings.json");							            // read from settings.json file
    let stashSettings = settingsFile.stashes;                                           // for tidying up code/abstraction	

    if (stashSettings.sizinStashes == true) {                                           // if 'sizinStashes' var in settings.json is set to true, execute script
        for (let item in itemsCache.data) {
            let cacheData = itemsCache.data[item];									    // for tidying up code/abstraction	
        
            if (cacheData._id == "566abbc34bdc2d92178b4576") {                          // 'Standard' Stash ID
                if (typeof stashSettings.standard == "number") {				        // check `standard` var in settings.json if exists or is number
                    cacheData._props.Grids[0]._props.cellsV = stashSettings.standard;   // if there, change `cellsV` in cache to match the `standard` var in settings.json
                } else {													            // otherwise, spit out an error in server console and end script
                    logger.logError(`[MOD] ${mod_info.name}: 'standard' variable has no value/is not a number! Check user/mods/${mod_info.author}-${mod_info.name}-${mod_info.version}/settings.json`);
                    return;
                }
            }

            if (cacheData._id == "5811ce572459770cba1a34ea") {                          // 'Left Behind' Stash ID
                if (typeof stashSettings.leftBehind == "number") {
                    cacheData._props.Grids[0]._props.cellsV = stashSettings.leftBehind;
                } else {
                    logger.logError(`[MOD] ${mod_info.name}: 'leftBehind' variable has no value/is not a number! Check user/mods/${mod_info.author}-${mod_info.name}-${mod_info.version}/settings.json`);
                    return;
                }
            }

            if (cacheData._id == "5811ce662459770f6f490f32") {                          // 'Prepare to Escape' Stash ID
                if (typeof stashSettings.prepareToEscape == "number") {
                    cacheData._props.Grids[0]._props.cellsV = stashSettings.prepareToEscape;
                } else {
                    logger.logError(`[MOD] ${mod_info.name}: 'prepareToEscape' variable has no value/is not a number! Check user/mods/${mod_info.author}-${mod_info.name}-${mod_info.version}/settings.json`);
                    return;
                }
            }

            if (cacheData._id == "5811ce772459770e9e5f9532") {                          // 'Edge of Darkness' Stash ID
                if (typeof stashSettings.edgeOfDarkness == "number") {
                    cacheData._props.Grids[0]._props.cellsV = stashSettings.edgeOfDarkness;
                } else {
                    logger.logError(`[MOD] ${mod_info.name}: 'edgeOfDarkness' variable has no value/is not a number! Check user/mods/${mod_info.author}-${mod_info.name}-${mod_info.version}/settings.json`);
                    return;
                }
            }
        }

        fileIO.write(global.db.user.cache.items, itemsCache);								    // write all changes to cache (items.json specifically)
        logger.logSuccess(`[MOD] -- ${mod_info.name}: ON (${stashSettings.standard}, ${stashSettings.leftBehind}, ${stashSettings.prepareToEscape}, ${stashSettings.edgeOfDarkness})`);
    } else {                                                                            // if 'sizinStashes' var in settings.json is set to false, skip entire script
        logger.logSuccess(`[MOD] -- ${mod_info.name}: OFF`); 
    }
}
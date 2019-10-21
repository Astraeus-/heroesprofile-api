const endpoints = require('./rest/endpoints.js');
const RequestHandler = require('./rest/RequestHandler.js');

class Client {
  constructor(token, defaultMode) {
    if (!defaultMode) defaultMode = 'json';

    this.requesthandler = new RequestHandler(token, defaultMode);
  }

  /**
     * Returns hero data
     * @param {object} [options] Endpoint options
     * @param {String} [options.mode=json] Data as csv or json
     * @param {String} [options.hero] Hero name
     * @param {String} [options.role] Hero role
     */
  getHeroes(options = {}) {
    return this.requesthandler.request('GET', endpoints.HEROES(), {
      mode: options.mode,
      hero: options.hero,
      role: options.role
    });
  }

  /**
     * Returns hero matchup data
     * @param {String} timeframeType One of major or minor
     * @param {String} timeframe If major first 4 characters of a patch otherwise full patch value
     * @param {String} gameType Game mode type
     * @param {String} hero Hero name
     * @param {object} [options] Endpoint options
     * @param {String} [options.mode=json] Data as csv or json
     */
  getHeroesMatchups(timeframeType, timeframe, gameType, hero, options = {}) {
    return this.requesthandler.request('GET', endpoints.HEROES_MATCHUPS(), {
      timeframe_type: timeframeType,
      timeframe: timeframe,
      game_type: gameType,
      hero: hero,
      mode: options.mode
    });
  }

  /**
     * Returns hero performance data
     * @param {String} timeframeType One of major or minor
     * @param {String} timeframe If major first 4 characters of a patch otherwise full patch value
     * @param {String} gameType Game mode type
     * @param {Boolean} groupByMap Whether to show data per map
     * @param {object} [options] Endpoint options
     * @param {String} [options.mode=json] Data as csv or json
     */
  getHeroesStats(timeframeType, timeframe, gameType, groupByMap, options = {}) {
    return this.requesthandler.request('GET', endpoints.HEROES_STATS(), {
      timeframe_type: timeframeType,
      timeframe: timeframe,
      game_type: gameType,
      group_by_map: groupByMap,
      mode: options.mode
    });
  }

  /**
     * Returns all hero talent data
     * @param {object} [options] Endpoint options
     * @param {String} [options.mode=json] Data as csv or json
     * @param {String} [options.hero] Hero name
     */
  getHeroesTalents(options = {}) {
    return this.requesthandler.request('GET', endpoints.HEROES_TALENTS(), {
      mode: options.mode,
      hero: options.hero
    });
  }

  /**
     * Returns hero talent performance data
     * @param {String} timeframeType One of major or minor
     * @param {String} timeframe If major first 4 characters of a patch otherwise full patch value
     * @param {String} gameType Game mode type
     * @param {object} [options] Endpoint options
     * @param {String} [options.mode=json] Data as csv or json
     * @param {String} [options.hero] Hero name
     */
  getHeroesTalentsBuilds(timeframeType, timeframe, gameType, options = {}) {
    return this.requesthandler.request('GET', endpoints.HEROES_TALENTS_BUILDS(), {
      timeframe_type: timeframeType,
      timeframe: timeframe,
      game_type: gameType,
      mode: options.mode,
      hero: options.hero
    });
  }

  /**
     * Returns top five talent builds
     * @param {String} timeframeType One of major or minor
     * @param {String} timeframe If major first 4 characters of a patch otherwise full patch value
     * @param {String} gameType Game mode type
     * @param {object} [options] Endpoint options
     * @param {String} [options.mode=json] Data as csv or json
     * @param {String} [options.hero] Hero name
     */
  getHeroesTalentsDetails(timeframeType, timeframe, gameType, options = {}) {
    return this.requesthandler.request('GET', endpoints.HEROES_TALENTS_DETAILS(), {
      timeframe_type: timeframeType,
      timeframe: timeframe,
      game_type: gameType,
      mode: options.mode,
      hero: options.hero
    });
  }

  /**
     * Returns map data
     * @param {object} [options] Endpoint options
     * @param {String} [options.mode=json] Data as csv or json
     * @param {String} [options.map] Map name
     */
  getMaps(options = {}) {
    return this.requesthandler.request('GET', endpoints.MAPS(), {
      mode: options.mode,
      map: options.map
    });
  }

  /**
     * Returns highest average stat data
     * @param {String} stat One of the stats
     * @param {Integer} [season] NGS season
     */
  getNGSLeaderboardHighestAverageStat(stat, season) {
    return this.requesthandler.request('GET', endpoints.NGS_LEADERBOARD_HIGHEST_AVERAGE_STAT(), {
      stat: stat,
      season: season
    });
  }

  /**
     * Returns highest total stat data
     * @param {String} stat One of the stats
     * @param {Integer} [season] NGS season
     */
  getNGSLeaderboardHighestTotalStat(stat, season) {
    return this.requesthandler.request('GET', endpoints.NGS_LEADERBOARD_HIGHEST_TOTAL_STAT(), {
      stat: stat,
      season: season
    });
  }

  /**
     * Returns all hero stats
     * @param {String} hero Hero name
     * @param {Integer} season NGS season
     * @param {String} division NGS division
     * @param {String} [battletag] Player battletag
     */
  getNGSPlayerHeroStat(hero, season, division, battletag) {
    return this.requesthandler.request('GET', endpoints.NGS_HERO_STAT(), {
      hero: hero,
      season: season,
      division: division,
      region: 1,
      battletag: battletag
    });
  }

  /**
     * Returns all hero stats
     * @param {String} battletag Player battletag
     * @param {object} [options] Endpoint options
     * @param {Integer} [options.season] NGS season
     * @param {String} [options.division] NGS division
     */
  getNGSPlayerProfile(battletag, options = {}) {
    return this.requesthandler.request('GET', endpoints.NGS_PLAYER_PROFILE(), {
      battletag: battletag,
      region: 1,
      season: options.season,
      division: options.division
    });
  }

  /**
     * Returns all hero stats
     * @param {String} battletag Player battletag
     */
  getNGSPlayerMMR(battletag) {
    return this.requesthandler.request('GET', endpoints.NGS_PLAYER_MMR(), {
      battletag: battletag,
      region: 1
    });
  }

  /**
     * Returns all hero stats
     * @param {String} mode development or production
     * @param {Integer} season NGS season
     * @param {String} division NGS division
     * @param {String} replayURL URL location of the replay
     * @param {Integer} round Round of the match
     * @param {Integer} game Game number
     * @param {object} teamOne Team one options
     * @param {String} teamOne.name Team one name
     * @param {String} teamOne.player Team one player
     * @param {String} teamOne.mapBanOne Map ban one
     * @param {String} teamOne.mapBanTwo Map ban two
     * @param {String} teamOne.imageUrl URL location of the team image
     * @param {object} teamTwo Team two options
     * @param {String} teamTwo.name Team two name
     * @param {String} teamTwo.player Team two player
     * @param {String} teamTwo.mapBanOne Map ban two
     * @param {String} teamTwo.mapBanTwo Map ban two
     * @param {String} teamTwo.imageUrl URL location of the team image
     */
  getNGSUpload(mode, season, division, replayURL, round, game, teamOne, teamTwo) {
    return this.requesthandler.request('GET', endpoints.NGS_UPLOAD(), {
      mode: mode,
      season: season,
      division: division,
      replayURL: replayURL,
      round: round,
      game: game,
      team_one_name: teamOne.name,
      team_one_player: teamOne.player,
      team_one_map_ban_one: teamOne.mapBanOne,
      team_one_map_ban_two: teamOne.mapBanTwo,
      team_one_image_url: teamOne.imageUrl,
      team_two_name: teamTwo.name,
      team_two_player: teamTwo.player,
      team_two_map_ban_one: teamTwo.mapBanOne,
      team_two_map_ban_two: teamTwo.mapBanTwo,
      team_two_image_url: teamTwo.imageUrl,
    });
  }

  /**
     * Returns all hero stats
     * @param {String} mode development or production
     * @param {Integer} season NGS season
     * @param {String} division NGS division
     * @param {String} replayURL URL location of the replay
     * @param {Integer} round Round of the match
     * @param {Integer} game Game number
     * @param {object} teamOne Team one options
     * @param {String} teamOne.name Team one name
     * @param {String} teamOne.player Team one player
     * @param {String} teamOne.mapBanOne Map ban one
     * @param {String} teamOne.mapBanTwo Map ban two
     * @param {String} teamOne.imageUrl URL location of the team image
     * @param {object} teamTwo Team two options
     * @param {String} teamTwo.name Team two name
     * @param {String} teamTwo.player Team two player
     * @param {String} teamTwo.mapBanOne Map ban two
     * @param {String} teamTwo.mapBanTwo Map ban two
     * @param {String} teamTwo.imageUrl URL location of the team image
     */
  postNGSUpload(mode, season, division, replayURL, round, game, teamOne, teamTwo) {
    return this.requesthandler.request('POST', endpoints.NGS_UPLOAD(), {
      mode: mode,
      season: season,
      division: division,
      replayURL: replayURL,
      round: round,
      game: game,
      team_one_name: teamOne.name,
      team_one_player: teamOne.player,
      team_one_map_ban_one: teamOne.mapBanOne,
      team_one_map_ban_two: teamOne.mapBanTwo,
      team_one_image_url: teamOne.imageUrl,
      team_two_name: teamTwo.name,
      team_two_player: teamTwo.player,
      team_two_map_ban_one: teamTwo.mapBanOne,
      team_two_map_ban_two: teamTwo.mapBanTwo,
      team_two_image_url: teamTwo.imageUrl,
    });
  }

  /**
     * Returns game patch data
     */
  getPatches() {
    return this.requesthandler.request('GET', endpoints.PATCHES());
  }

  /**
     * Returns player profile data
     * @param {String} battletag Player battletag
     * @param {Integer} region Region (1 = NA, 2 = EU, 3 = KR, 5 = CN)
     */
  getPlayer(battletag, region) {
    return this.requesthandler.request('GET', endpoints.PLAYER(), {
      battletag: battletag,
      region: region
    });
  }

  /**
     * Returns all hero data for a player
     * @param {String} battletag Player battletag
     * @param {Integer} region Region (1 = NA, 2 = EU, 3 = KR, 5 = CN)
     * @param {object} [options] Endpoint options
     * @param {String} [options.mode=json] Data as csv or json
     * @param {String} [options.gameType] Game mode type
     */
  getPlayerHeroAll(battletag, region, options = {}) {
    return this.requesthandler.request('GET', endpoints.PLAYER_HERO_ALL(), {
      battletag: battletag,
      region: region,
      mode: options.mode,
      game_type: options.gameType
    });
  }

  /**
     * Returns specified hero data for a player
     * @param {String} battletag Player battletag
     * @param {Integer} region Region (1 = NA, 2 = EU, 3 = KR, 5 = CN)
     * @param {String} gameType Game mode type
     * @param {String} hero Hero name
     * @param {object} [options] Endpoint options
     * @param {String} [options.mode=json] Data as csv or json
     */
  getPlayerHeroSingle(battletag, region, gameType, hero, options = {}) {
    return this.requesthandler.request('GET', endpoints.PLAYER_HERO_SINGLE(), {
      battletag: battletag,
      region: region,
      game_type: gameType,
      hero: hero,
      mode: options.mode
    });
  }

  /**
     * Returns player MMR data
     * @param {String} battletag Player battletag
     * @param {Integer} region Region (1 = NA, 2 = EU, 3 = KR, 5 = CN)
     * @param {object} [options] Endpoint options
     * @param {String} [options.gameType] Game mode type
     * @param {String} [options.mode=json] Data as csv or json
     */
  getPlayerMMR(battletag, region, options = {}) {
    return this.requesthandler.request('GET', endpoints.PLAYER_MMR(), {
      battletag: battletag,
      region: region,
      game_type: options.gameType,
      mode: options.mode
    });
  }

  /**
     * Returns player MMR data
     * @param {String} battletag Player battletag
     * @param {Integer} region Region (1 = NA, 2 = EU, 3 = KR, 5 = CN)
     * @param {String} gameType Game mode type
     * @param {String} hero Hero name
     * @param {object} [options] Endpoint options
     * @param {String} [options.mode=json] Data as csv or json
     */
  getPlayerMMRHero(battletag, region, gameType, hero, options = {}) {
    return this.requesthandler.request('GET', endpoints.PLAYER_MMR_HERO(), {
      battletag: battletag,
      region: region,
      game_type: gameType,
      hero: hero,
      mode: options.mode
    });
  }

  /**
     * Returns player MMR data
     * @param {String} battletag Player battletag
     * @param {Integer} region Region (1 = NA, 2 = EU, 3 = KR, 5 = CN)
     * @param {String} gameType Game mode type
     * @param {String} role Hero role
     * @param {object} [options] Endpoint options
     * @param {String} [options.mode=json] Data as csv or json
     */
  getPlayerMMRRole(battletag, region, gameType, role, options = {}) {
    return this.requesthandler.request('GET', endpoints.PLAYER_MMR_ROLE(), {
      battletag: battletag,
      region: region,
      game_type: gameType,
      role: role,
      mode: options.mode
    });
  }

  /**
     * Returns player Pre match data
     * @param {String} battletag Player battletag
     * @param {Integer} region Region (1 = NA, 2 = EU, 3 = KR, 5 = CN)
     * @param {String} gameType Game mode type
     * @param {object} [options] Endpoint options
     * @param {String} [options.mode=json] Data as csv or json
     * @param {String} [options.gameMap] Map name
     * @param {String} [options.role] Hero role
     */
  getPlayerPreMatch(battletag, region, gameType, options = {}) {
    return this.requesthandler.request('GET', endpoints.PLAYER_PREMATCH(), {
      battletag: battletag,
      region: region,
      game_type: gameType,
      mode: options.mode,
      game_map: options.gameMap,
      role: options.role
    });
  }

  /**
     * Returns player Pre match data
     * @param {String} battletag Player battletag
     * @param {Integer} region Region (1 = NA, 2 = EU, 3 = KR, 5 = CN)
     * @param {String} gameType Game mode type
     * @param {object} [options] Endpoint options
     * @param {String} [options.mode=json] Data as csv or json
     * @param {String} [options.gameMap] Map name
     * @param {String} [options.role] Hero role
     */
  postPlayerPreMatch(battletag, region, gameType, options = {}) {
    return this.requesthandler.request('GET', endpoints.PLAYER_PREMATCH(), {
      battletag: battletag,
      region: region,
      game_type: gameType,
      mode: options.mode,
      game_map: options.gameMap,
      role: options.role
    });
  }

  /**
     * Returns player match replay data
     * @param {String} battletag Player battletag
     * @param {Integer} region Region (1 = NA, 2 = EU, 3 = KR, 5 = CN)
     * @param {object} [options] Endpoint options
     * @param {String} [options.mode=json] Data as csv or json
     * @param {String} [options.gameType] Game mode type
     * @param {String} [options.hero] Hero name
     */
  getPlayerReplays(battletag, region, options = {}) {
    return this.requesthandler.request('GET', endpoints.PLAYER_REPLAYS(), {
      battletag: battletag,
      region: region,
      mode: options.mode,
      game_type: options.gameType,
      hero: options.hero
    });
  }

  /**
     * Returns player hero talent data
     * @param {String} battletag Player battletag
     * @param {Integer} region Region (1 = NA, 2 = EU, 3 = KR, 5 = CN)
     * @param {String} hero Hero name
     * @param {object} [options] Endpoint options
     * @param {String} [options.minDate] Date in format mm-dd-yyyy
     */
  getPlayerTalentsBuilds(battletag, region, hero, options = {}) {
    return this.requesthandler.request('GET', endpoints.PLAYER_TALENTS_BUILD(), {
      battletag: battletag,
      region: region,
      hero: hero,
      min_date: options.minDate
    });
  }

  /**
     * Returns replay ban data
     * @param {String} replayID
     */
  getReplayBan(replayID) {
    return this.requesthandler.request('GET', endpoints.REPLAY_BAN(), {
      replayID: replayID
    });     
  }

  /**
     * Returns replay data
     * @param {String} replayID
     */
  getReplayData(replayID) {
    return this.requesthandler.request('GET', endpoints.REPLAY_DATA(), {
      replayID: replayID
    });
  }

  /**
      * Returns the max replay ID in the database
      */
  getReplayMax() {
    return this.requesthandler.request('GET', endpoints.REPLAY_MAX());
  }
}

module.exports = Client;

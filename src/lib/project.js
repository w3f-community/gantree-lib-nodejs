const ospath = require('ospath')
const path = require('path')

class Project {
  constructor(cfg) {
    this.name = cfg.project
  }

  path() {
    return path.join(ospath.data(), 'gantree-cli', 'build', this.name)
  }
}

module.exports = {
  Project
}

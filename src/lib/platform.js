const asyncUtils = require('./async.js')
const { Terraform } = require('./clients/terraform')

class Platform {
  constructor(cfg) {
    this.config = JSON.parse(JSON.stringify(cfg))

    this.tf = new Terraform(this.config)
  }

  async sync() {
    await this.tf.sync()
    const validatorIpAddresses = await this._extractOutput(
      'validator',
      this.config.validators.nodes
    )
    return { validatorIpAddresses }
  }

  async clean() {
    return this.tf.clean()
  }

  async _extractOutput(type, nodeSet) {
    const output = []
    await asyncUtils.forEach(nodeSet, async (node, index) => {
      const ipAddress = await this.tf.nodeOutput(type, index, 'ip_address')
      output.push(JSON.parse(ipAddress.toString()))
    })
    return output
  }
}

module.exports = {
  Platform
}

import { v4 as uuidv4 } from 'uuid';

class ACL {
  constructor(params) {
    this.id = params.id || uuidv4();
    this.name = params.name;
    this.accountId = params.accountId;
    this.accountName = params.accountName;
    if (params.destinationIP.length > 0) {
      this.type = 'Destination';
      this.destinationIP = params.destinationIP;
      this.destinationeProtocol = params.destinationeProtocol;
      this.destinationeDecesion = params.destinationeDecesion;
    } else {
      this.type = 'Source';
      this.sourceIP = params.sourceIP;
      this.sourceProtocol = params.sourceProtocol;
      this.sourceDecesion = params.sourceDecesion;
    }
  }
}

export default ACL;

import dgram from 'react-native-udp';

export class UdpDiscovery {
  private socket: any | null = null;

  public start(port: number) {
    this.socket = dgram.createSocket({ type: 'udp4' });
    this.socket.bind(port);

    this.socket.on('message', (msg: Buffer, rinfo: any) => {
      console.log('Received UDP message:', msg.toString(), 'from', rinfo.address, ':', rinfo.port);
    });

    this.socket.on('error', (error: Error) => {
      console.error('UDP error:', error);
    });

    this.socket.on('listening', () => {
      const address = this.socket.address();
      console.log('UDP socket listening on', address.address, ':', address.port);
    });
  }

  public send(msg: string, host: string, port: number) {
    if (this.socket) {
      this.socket.send(msg, 0, msg.length, port, host, (error: Error | null) => {
        if (error) {
          console.error('UDP send error:', error);
        } else {
          console.log('UDP message sent');
        }
      });
    }
  }

  public stop() {
    if (this.socket) {
      this.socket.close();
      this.socket = null;
    }
  }
}

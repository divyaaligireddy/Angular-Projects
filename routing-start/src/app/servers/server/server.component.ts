import {Component, OnDestroy, OnInit} from '@angular/core';

import { ServersService } from '../servers.service';
import {ActivatedRoute, Params} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.css']
})
export class ServerComponent implements OnInit, OnDestroy {
  server: {id: number, name: string, status: string};
  private paramSubscriber: Subscription;

  constructor(private serversService: ServersService, private route: ActivatedRoute) { }

  ngOnInit() {
    console.log(this.route.params['id']);
    const id = +this.route.snapshot.params['id'];
    this.server = this.serversService.getServer(id);
    this.paramSubscriber = this.route.params.subscribe(
      (params: Params) => {
        this.server = this.serversService.getServer(+params['id']);
      }
    );
  }

  ngOnDestroy() {
    this.paramSubscriber.unsubscribe();
  }


}

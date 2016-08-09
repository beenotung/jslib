/**
 * for typescript compiler and dev-time reference only,
 * not naming .d.ts for tsconfig specific issue (it skip .d.ts in library)
 * DO NOT include in html
 *
 * Created by beenotung on 5/28/16.
 */

namespace jslib {
  export namespace HorizonStub {
    export interface TableQuery<A> extends FinalQuery<A> {
      order(field:string, direction?:string):OrderQuery<A> // default ascending
      above(idOrObject:string|any, type?:string):OrderQuery<A> // default open(exclusive)
    }
    export interface FinalQuery<A> {
      limit(max:number):LimitedFinalQuery<A>
      fetch():Rx.Observable<A[]>
    }
    export interface SingleFinalQuery<A> extends Rx.Observable<A> {
      defaultIfEmpty():Rx.Observable<A>
    }
    export interface LimitedFinalQuery<A> {
      fetch():Rx.Observable<A[]>
    }
    export interface OrderQuery<A> extends FinalQuery<A> {
      below(idOrObject:string|any, type?:string):FinalQuery<A[]> // default open(exclusive)
    }
    export interface FindQuery<A> {
      fetch():SingleFinalQuery<A>
    }
    export interface CreatedObject {
      id:string;
    }
    export interface Filter {
      [key:string]:any
    }
    export interface Record {
      id?:string
      [key:string]:string|Array<Record>|number|Record
    }
    export interface OldRecord {
      id:string
      [key:string]:string|Array<Record>|number|Record
    }
    export interface TableObject<A> extends TableQuery<A> {
      find(o:string|Filter):FindQuery<A>
      findAll(...o:[string|Filter][]):TableQuery<A>
      insert(o:Record):TableObject<CreatedObject>
      remove(o:string|Filter):TableObject<CreatedObject>
      removeAll(o:string|Filter):Rx.Observable<CreatedObject>
      replace(...o:[string|Filter][]):Rx.Observable<CreatedObject>
      store(o:Record):Rx.Observable<CreatedObject>
      update(o:OldRecord):TableQuery<CreatedObject>
      upsert(o:Record|OldRecord):TableQuery<CreatedObject>
    }
    export interface HorizonConstParam {
      host:string;
      authType:string;
    }
    export interface HorizonConstructor {
      new():Horizon
      new(param:HorizonConstParam):Horizon
      clearAuthToken():void
    }
    export interface Horizon {
      find<A>():Rx.Observable<A>

      call<A>(_this:Horizon, table:string):TableObject<A>

      <A> ():TableObject<A>;

      currentUser():TableQuery<any>

      hasAuthToken():boolean

      connect():void

      onReady(f:Function):void

      onDisconnected(f:Function):void

      onSocketError(f:(error:any)=>void):void
    }

    export var Horizon:HorizonConstructor;
  }
}
export = jslib
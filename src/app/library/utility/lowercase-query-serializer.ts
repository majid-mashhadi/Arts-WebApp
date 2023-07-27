// import { Injectable } from '@angular/core';
import { DefaultUrlSerializer, UrlSegment, UrlSerializer, UrlTree } from '@angular/router';

export class LowerCaseUrlSerializer extends DefaultUrlSerializer {
    urlSerializer: DefaultUrlSerializer;
    constructor()  {
        super();
        this.urlSerializer = new DefaultUrlSerializer();
    }
    override parse(url: string): UrlTree {
        return this.urlSerializer.parse(url);
    }

    override serialize(urlTree: UrlTree): string {
        const { queryParams }= urlTree;
        const lowercaseQueryParams : any = {};
        for(const key of Object.keys(queryParams)) { 
            lowercaseQueryParams[key.toLowerCase()] =  queryParams[key];
        }
        urlTree.queryParams = lowercaseQueryParams;
        return this.urlSerializer.serialize(urlTree)
            .replace(/%40/gi, '@')
            .replace(/%3A/gi, ':')
            .replace(/%24/gi, '$')
            .replace(/%2C/gi, ',')
            .replace(/%3B/gi, ';')
            .replace(/%20/gi, '+')
            .replace(/%3D/gi, '=')
            .replace(/%3F/gi, '?')
            .replace(/%2F/gi, '/');

  }
}
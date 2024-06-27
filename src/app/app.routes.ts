import { Routes } from '@angular/router';
import { inject } from '@angular/core';
import { BannerService } from './services/banner.service';
import { CreateBannerComponent } from './components/banner/create-banner/create-banner.component';
import { AllBannerComponent } from './components/banner/all-banner/all-banner.component';
import { CreateBrandComponent } from './components/brand/create-brand/create-brand.component';
import { AllBrandComponent } from './components/brand/all-brand/all-brand.component';
import { AllProductComponent } from './components/product/all-product/all-product.component';
import { CreateProductComponent } from './components/product/create-product/create-product.component';
import { AllModelComponent } from './components/model/all-model/all-model.component';
import { CreateModelComponent } from './components/model/create-model/create-model.component';
import { CreateProductSingleComponent } from './components/product-single/create-product-single/create-product-single.component';
import { AllProductSingleComponent } from './components/product-single/all-product-single/all-product-single.component';
import { AuthComponent } from './components/auth/auth.component';
import { AuthGuardService } from './util/authgurd';
import { AllClientComponent } from './components/client/all-client/all-client.component';
import { CreateClientComponent } from './components/client/create-client/create-client.component';
import { CreateregisterDealerComponent } from './components/registerDealer/registerDealer.component';
import { AllsubCategotyComponent } from './components/subCategoty/all-subCategoty/all-subCategoty.component';
import { EditSubCategotyComponent } from './components/subCategoty/create-subCategoty/create-subCategoty.component';
import { AlleventSingleComponent } from './components/event/all-event-single/all-event-single.component';
import { EventComponent } from './components/event/create-event-single/create-event-single.component';

export const routes: Routes = [
    {
        path: 'addBanner',
        component: CreateBannerComponent,
        canActivate: [AuthGuardService]

    },
    {
        path: 'product',
        component: AllProductComponent,
        canActivate: [AuthGuardService]
    },
    {
        path: 'client',
        component: AllClientComponent,
        canActivate: [AuthGuardService]
    },
    {
        path: 'addclient',
        component: CreateClientComponent,
        canActivate: [AuthGuardService]
    },
    {
        path: 'banner',
        component: AllBannerComponent,
        canActivate: [AuthGuardService]

    },
    {
        path: 'subCategoty',
        component: AllsubCategotyComponent,
        canActivate: [AuthGuardService]

    },
    {
        path: 'addBrand',
        component: CreateBrandComponent,
        canActivate: [AuthGuardService]
    },
    {
        path: 'editBrand/:id',
        component: CreateBrandComponent,
        canActivate: [AuthGuardService]
    },
    {
        path: 'addsubCategoty',
        component: EditSubCategotyComponent,
        canActivate: [AuthGuardService]
    },
    {
        path: 'editsubCategoty/:id',
        component: EditSubCategotyComponent,
        canActivate: [AuthGuardService]
    },
    {
        path: 'editProduct/:id',
        component: CreateProductComponent,
        canActivate: [AuthGuardService]
    },

    {
        path: 'addProduct',
        component: CreateProductComponent,
        canActivate: [AuthGuardService]
    },
    {
        path: 'brand',
        component: AllBrandComponent,
        canActivate: [AuthGuardService]

    },
    {
        path: 'events',
        component: AlleventSingleComponent,
        canActivate: [AuthGuardService]

    },
    {
        path: 'model',
        component: AllModelComponent,
        canActivate: [AuthGuardService]

    },
    {
        path: 'addModel',
        component: CreateModelComponent,
        canActivate: [AuthGuardService]

    },
    {
        path: 'productSingle',
        component: AllProductSingleComponent,
        canActivate: [AuthGuardService]

    },
    {
        path: 'addProductSingle',
        component: CreateProductSingleComponent,
        canActivate: [AuthGuardService]

    },
    {
        path: 'editProductSingle/:id',
        component: CreateProductSingleComponent,
        canActivate: [AuthGuardService]
    },
    {
        path: 'editModel/:id',
        component: CreateModelComponent,
        canActivate: [AuthGuardService]
    },

    {
        path: '',
        component: AuthComponent


    },
    {
        path: 'registerDealer',
        component: CreateregisterDealerComponent,
        canActivate: [AuthGuardService]

    },
    {
        path: 'addEventSingle',
        component: EventComponent,
        canActivate: [AuthGuardService]

    },
    {
        path: 'editEventSingle/:id',
        component: EventComponent,
        canActivate: [AuthGuardService]
    },



];

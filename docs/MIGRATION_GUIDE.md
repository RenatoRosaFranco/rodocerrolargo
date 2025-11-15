# Migration Guide - Portuguese to English

## Overview
This guide documents the migration from Portuguese to English naming conventions across the entire codebase.

## Directory Structure Changes

### Routes
| Old Path | New Path |
|----------|----------|
| `/publicidade` | `/advertising` |
| `/publicidade/solicitar` | `/advertising/request` |
| `/taxistas` | `/taxi-drivers` |
| `/taxistas/cadastro` | `/taxi-drivers/register` |
| `/admin/publicidade` | `/admin/ads` |
| `/admin/taxistas` | `/admin/taxi-drivers` |

### API Routes
| Old Path | New Path |
|----------|----------|
| `/api/publicidades` | `/api/ads` |
| `/api/taxistas` | `/api/taxi-drivers` |

## Model Changes

### TaxiDriver Model (SIMPLIFIED - Only 4 required fields)

**Old Fields (Portuguese):**
```javascript
{
  nomeCompleto, cpf, telefone, whatsapp, email,
  numeroAlvara, placaVeiculo, modeloVeiculo, anoVeiculo, corVeiculo,
  foto, descricao, status, motivoRejeicao,
  dataCadastro, dataAprovacao, aprovadoPor
}
```

**New Fields (English - Simplified):**
```javascript
{
  // REQUIRED (only 4 fields)
  fullName: String,
  email: String,
  phone: String,
  whatsapp: String,

  // OPTIONAL
  description: String,
  photo: String,

  // System fields
  status: 'pending' | 'approved' | 'rejected',
  rejectionReason: String,
  registrationDate: Date,
  approvalDate: Date,
  approvedBy: String
}
```

### Advertisement Model

**Field Mapping:**
| Old (Portuguese) | New (English) |
|------------------|---------------|
| nomeEmpresa | companyName |
| responsavel | contactPerson |
| telefone | phone |
| tipoBanner | bannerType |
| imagemUrl | imageUrl |
| linkDestino | destinationLink |
| textoAlternativo | altText |
| dataInicio | startDate |
| dataFim | endDate |
| visualizacoes | views |
| aprovadoPor | approvedBy |
| dataAprovacao | approvalDate |
| motivoRejeicao | rejectionReason |

**Banner Types:**
| Old | New |
|-----|-----|
| topo | top |
| lateral-esquerdo | sidebar-left |
| lateral-direito | sidebar-right |
| rodape | footer |
| popup | popup |

**Status Values:**
| Old | New |
|-----|-----|
| pendente | pending |
| ativo | active |
| pausado | paused |
| expirado | expired |
| rejeitado | rejected |

**Plan Values:**
| Old | New |
|-----|-----|
| basico | basic |
| intermediario | intermediate |
| premium | premium |

## Files Renamed

### Models
- `src/models/Taxista.js` → `src/models/TaxiDriver.js`
- `src/models/Publicidade.js` → `src/models/Advertisement.js`

### Validations
- `src/validations/taxistaSchema.js` → `src/validations/taxiDriverSchema.js`
- `src/validations/publicidadeSchema.js` → `src/validations/advertisementSchema.js`

### Components
- `src/ui/components/TaxistaForm.jsx` → `src/ui/components/TaxiDriverForm.jsx`
- `src/ui/components/TaxistaList.jsx` → `src/ui/components/TaxiDriverList.jsx`
- `src/ui/components/AdminPanel.jsx` → `src/ui/components/AdminTaxiDrivers.jsx`
- `src/ui/components/PublicidadeForm.jsx` → `src/ui/components/AdvertisementForm.jsx`
- `src/ui/components/PlanosPublicidade.jsx` → `src/ui/components/AdvertisingPlans.jsx`
- `src/ui/components/AdminPublicidade.jsx` → `src/ui/components/AdminAdvertisements.jsx`

## Required Updates

### 1. Update All Imports

Search and replace across the codebase:

**Component Imports:**
```javascript
// OLD
import TaxistaForm from '@/ui/components/TaxistaForm';
import TaxistaList from '@/ui/components/TaxistaList';
import AdminPanel from '@/ui/components/AdminPanel';
import PublicidadeForm from '@/ui/components/PublicidadeForm';
import PlanosPublicidade from '@/ui/components/PlanosPublicidade';
import AdminPublicidade from '@/ui/components/AdminPublicidade';

// NEW
import TaxiDriverForm from '@/ui/components/TaxiDriverForm';
import TaxiDriverList from '@/ui/components/TaxiDriverList';
import AdminTaxiDrivers from '@/ui/components/AdminTaxiDrivers';
import AdvertisementForm from '@/ui/components/AdvertisementForm';
import AdvertisingPlans from '@/ui/components/AdvertisingPlans';
import AdminAdvertisements from '@/ui/components/AdminAdvertisements';
```

**Model Imports:**
```javascript
// OLD
import Taxista from '@/models/Taxista';
import Publicidade from '@/models/Publicidade';

// NEW
import TaxiDriver from '@/models/TaxiDriver';
import Advertisement from '@/models/Advertisement';
```

**Schema Imports:**
```javascript
// OLD
import { taxistaSchema } from '@/validations/taxistaSchema';
import { publicidadeSchema } from '@/validations/publicidadeSchema';

// NEW
import { taxiDriverSchema } from '@/validations/taxiDriverSchema';
import { advertisementSchema } from '@/validations/advertisementSchema';
```

### 2. Update Links in Header.jsx

```javascript
// OLD
<Nav.Link href="/taxistas">Taxistas</Nav.Link>
<Nav.Link href="/taxistas/cadastro">Cadastrar Taxista</Nav.Link>
<Nav.Link href="/publicidade">Anuncie</Nav.Link>

// NEW
<Nav.Link href="/taxi-drivers">Taxi Drivers</Nav.Link>
<Nav.Link href="/taxi-drivers/register">Register</Nav.Link>
<Nav.Link href="/advertising">Advertise</Nav.Link>
```

### 3. Update API Fetch Calls

Search for all `fetch()` calls and update:

```javascript
// OLD
fetch('/api/taxistas')
fetch('/api/taxistas/123')
fetch('/api/publicidades')
fetch('/api/publicidades/456')

// NEW
fetch('/api/taxi-drivers')
fetch('/api/taxi-drivers/123')
fetch('/api/ads')
fetch('/api/ads/456')
```

### 4. Update Form Fields

**TaxiDriverForm.jsx - Use only 4 required fields:**
```javascript
const initialValues = {
  fullName: '',
  email: '',
  phone: '',
  whatsapp: '',
  description: '', // optional
};
```

**AdvertisementForm.jsx - Update field names:**
```javascript
const initialValues = {
  companyName: '',
  cnpj: '',
  contactPerson: '',
  email: '',
  phone: '',
  bannerType: '',
  imageUrl: '',
  destinationLink: '',
  altText: '',
  startDate: '',
  endDate: '',
  plan: '',
};
```

### 5. Update Component References

**Page Files to Update:**
- `src/app/taxi-drivers/page.js`
- `src/app/taxi-drivers/register/page.js`
- `src/app/advertising/page.js`
- `src/app/advertising/request/page.js`
- `src/app/admin/taxi-drivers/page.js`
- `src/app/admin/ads/page.js`

## Database Migration

If you have existing data, you'll need to migrate:

### MongoDB Migration Script

```javascript
// Rename collections
db.taxistas.renameCollection('taxidrivers');
db.publicidades.renameCollection('advertisements');

// Update TaxiDriver documents (remove unnecessary fields)
db.taxidrivers.updateMany({}, {
  $rename: {
    "nomeCompleto": "fullName",
    "telefone": "phone",
    "descricao": "description",
    "foto": "photo",
    "motivoRejeicao": "rejectionReason",
    "dataCadastro": "registrationDate",
    "dataAprovacao": "approvalDate",
    "aprovadoPor": "approvedBy"
  },
  $unset: {
    "cpf": "",
    "numeroAlvara": "",
    "placaVeiculo": "",
    "modeloVeiculo": "",
    "anoVeiculo": "",
    "corVeiculo": ""
  }
});

// Update status values
db.taxidrivers.updateMany(
  { status: "pendente" },
  { $set: { status: "pending" } }
);
db.taxidrivers.updateMany(
  { status: "aprovado" },
  { $set: { status: "approved" } }
);
db.taxidrivers.updateMany(
  { status: "rejeitado" },
  { $set: { status: "rejected" } }
);

// Update Advertisement documents
db.advertisements.updateMany({}, {
  $rename: {
    "nomeEmpresa": "companyName",
    "responsavel": "contactPerson",
    "telefone": "phone",
    "tipoBanner": "bannerType",
    "imagemUrl": "imageUrl",
    "linkDestino": "destinationLink",
    "textoAlternativo": "altText",
    "dataInicio": "startDate",
    "dataFim": "endDate",
    "visualizacoes": "views",
    "aprovadoPor": "approvedBy",
    "dataAprovacao": "approvalDate",
    "motivoRejeicao": "rejectionReason"
  }
});

// Update banner types
db.advertisements.updateMany({ bannerType: "topo" }, { $set: { bannerType: "top" } });
db.advertisements.updateMany({ bannerType: "lateral-esquerdo" }, { $set: { bannerType: "sidebar-left" } });
db.advertisements.updateMany({ bannerType: "lateral-direito" }, { $set: { bannerType: "sidebar-right" } });
db.advertisements.updateMany({ bannerType: "rodape" }, { $set: { bannerType: "footer" } });

// Update status values
db.advertisements.updateMany({ status: "pendente" }, { $set: { status: "pending" } });
db.advertisements.updateMany({ status: "ativo" }, { $set: { status: "active" } });
db.advertisements.updateMany({ status: "pausado" }, { $set: { status: "paused" } });
db.advertisements.updateMany({ status: "expirado" }, { $set: { status: "expired" } });
db.advertisements.updateMany({ status: "rejeitado" }, { $set: { status: "rejected" } });

// Update plan values
db.advertisements.updateMany({ plan: "basico" }, { $set: { plan: "basic" } });
db.advertisements.updateMany({ plan: "intermediario" }, { $set: { plan: "intermediate" } });
```

## Testing Checklist

After migration, test:

- [ ] Taxi driver registration form (only 4 fields required)
- [ ] Taxi driver listing page
- [ ] Admin taxi driver approval
- [ ] Advertisement request form
- [ ] Advertising plans page
- [ ] Admin advertisement management
- [ ] All API endpoints
- [ ] Banner display (all 5 types)
- [ ] Links in header navigation

## Breaking Changes

⚠️ **IMPORTANT**: This is a breaking change. All existing:
- Database data must be migrated
- Frontend forms will not work with old API
- Old URLs will return 404

## Rollback Plan

If needed to rollback:
1. Restore database backup
2. Revert git commits
3. Restart application

## Notes

- All user-facing text remains in Portuguese (UI labels, messages)
- Only code (variables, functions, routes) is now in English
- Database field names are now in English
- TaxiDriver model is significantly simplified (4 required fields vs 11)

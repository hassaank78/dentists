# Dentist clinic website template

A static, responsive recreation of the supplied Aura Dental Arts desktop and mobile Stitch designs. The page switches to the dedicated mobile composition below 768px and has no build step.

## Preview and personalize

Open `index.html` in a browser. When hosted, pass clinic details in the URL. Example:

```text
https://your-domain.example/?clinic=Harbor%20Dental&doctor=Dr.%20Ava%20Shah&location=Koramangala%2C%20Bengaluru&address=10%20Pine%20Street%2C%20Bengaluru&phone=%2B91%2080%204123%204567&whatsapp=%2B91%2098765%2043210&hours=Mon-Sat%209am-6pm&rating=4.8&reviews=320&experience=12&patients=8000&qualification=BDS%2C%20MDS&accent=%2316766d
```

Supported query parameters:

| Parameter | Example | Updates |
| --- | --- | --- |
| `clinic` | `Harbor Dental` | Clinic name and page title |
| `doctor` | `Dr. Ava Shah` | Dentist name throughout the page |
| `location` | `Koramangala, Bengaluru` | Area and city; can also be set separately with `area` and `city` |
| `address` | `10 Pine Street, Bengaluru` | Clinic address and map directions |
| `phone` | `+91 80 4123 4567` | Call links and phone display |
| `whatsapp` | `+91 98765 43210` | WhatsApp links and appointment draft |
| `emergency` | `+91 80 4000 0000` | Emergency call links |
| `hours` | `Mon-Sat: 9am-6pm` | Clinic hours |
| `rating`, `reviews` | `4.8`, `320` | Sample review summary |
| `experience`, `patients` | `12`, `8000` | Experience and patient-count text |
| `qualification` | `BDS, MDS` | Dentist qualifications |
| `accent` | `%2316766d` | Primary theme color; encode `#` as `%23` |

Values are URL-decoded and inserted as text. The reference art includes sample clinic claims, pricing, reviews, and externally hosted images; replace those with verified clinic content/assets before publishing a live clinic site.

## Smile-N-Style preview

Open this query URL to preview the template with the supplied clinic details (for a hosted copy, replace the index.html path with your site URL):

```text
file:///C:/Users/Hassan/Documents/Dentist/index.html?clinic=SMILE-N-STYLE&doctor=Dr%20Gaurav%20B%20Shetty&area=Kurla%20West&city=Mumbai&address=Lal%20Bahadur%20Shastri%20Marg%2C%20opp.%20Phoenix%20Market%20City%20Mall%2C%20Kurla%20West%2C%20Kurla%2C%20Mumbai%2C%20Maharashtra%20400070&phone=098209%2085271&whatsapp=%2B91%2098209%2085271&reviews=317
```

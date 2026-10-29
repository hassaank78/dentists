(() => {
  const params = new URLSearchParams(location.search);
  const value = (key, fallback) => (params.get(key)?.trim() || fallback).slice(0, 180);
  const customClinic = params.get('demo') !== '1';
  const locationParts = value('location', 'Kurla West, Mumbai').split(',').map((part) => part.trim());
  const data = {
    clinic: value('clinic', 'SMILE-N-STYLE'),
    doctor: value('doctor', 'Dr Gaurav B Shetty'),
    area: value('area', locationParts[0] || 'Kurla West'),
    city: value('city', locationParts[1] || 'Mumbai'),
    address: value('address', 'Lal Bahadur Shastri Marg, opp. Phoenix Market City Mall, Kurla West, Kurla, Mumbai, Maharashtra 400070'),
    phone: value('phone', '098209 85271'),
    whatsapp: value('whatsapp', '+91 98209 85271'),
    emergency: value('emergency', '+91 80 4123 4567'),
    rating: value('rating', customClinic ? '' : '4.9'),
    reviews: value('reviews', customClinic ? '317' : '1,450+'),
    experience: value('experience', '15'),
    patients: value('patients', '10,000+'),
    qualification: value('qualification', 'BDS, MDS (Prosthodontics & Implantology)'),
    accent: value('accent', '#00685f')
  };
  const digits = (phone) => phone.replace(/\D/g, '');
  const formattedReviews = /^\d+$/.test(data.reviews) ? data.reviews : data.reviews;
  const replacements = [
    ['#412, 2nd Floor, 100 Feet Road, HAL 2nd Stage, Indiranagar, Bengaluru, Karnataka 560038', data.address],
    ['#412, 100 Feet Road, HAL 2nd Stage, Indiranagar, Bengaluru, Karnataka 560038', data.address],
    ['#412, 100 Feet Road, HAL 2nd Stage, Indiranagar, Bengaluru, Karnataka 560038', data.address],
    ['100 Feet Rd, Indiranagar, Bengaluru', `${data.area}, ${data.city}`],
    ['Aura Dental Arts & Implant Centre', data.clinic],
    ['Aura Dental Arts', data.clinic],
    ['SMILE-N-STYLE', data.clinic],
    ['KURLA WEST', data.area.toUpperCase()],
    ['Kurla West', data.area], ['Mumbai', data.city],
    ['317 Google reviews', `${formattedReviews} Google reviews`],
    ['Indiranagar 100ft Rd, BLR', `${data.area} · ${data.city}`],
    ['Dr. Aarav Mehta', data.doctor], ['Dr. Mehta', data.doctor],
    ['Dr. Aarav Mehta (BDS, MDS) • 15+ Yrs', data.doctor],
    ['BDS, MDS (Prosthodontics & Implantology) • Fellow of ICOI (USA) • Ex-Consultant, Manipal Hospitals', 'Add the doctor’s qualifications and clinical focus here.'],
    ['BDS, MDS • Senior Prosthodontist & Implantologist', 'Dentist'],
    ['BDS, MDS (Oral Implantology, RGUHS)', 'Add doctor qualifications here.'],
    ['Chief Implantologist & Prosthodontist', 'Dentist'],
    ['IDA Reg #KA-DEN-4912', 'Dental Clinic'],
    ['Dr. Mehta’s', `${data.doctor}’s`], ['Dr. Aarav', data.doctor],
    ['Aura Dental trembling', `${data.clinic} trembling`], ['Aura Dental.', `${data.clinic}.`],
    ['Indiranagar', data.area], ['Bengaluru', data.city],
    ['+91 98201 XXXXX', data.whatsapp], ['+91 80 4920 8899', data.phone],
    ['+91 80 4920 8899', data.phone], ['08049208899', digits(data.phone)],
    ['080 4123 4567', data.emergency], ['(080) 4123 4567', data.emergency],
    ['4.9/5', data.rating ? `${data.rating}/5` : `${formattedReviews} reviews`],
    ['4.9 Star Rating on Google', data.rating ? `${data.rating} Star Rating on Google` : `${formattedReviews} Google Reviews`],
    ['★ 4.9 (1.2k Google)', data.rating ? `★ ${data.rating} (${formattedReviews} Google)` : `${formattedReviews} Google reviews`],
    ['1,450+', formattedReviews], ['over 15 years', `over ${data.experience} years`], ['15 years', `${data.experience} years`],
    ['10,000 successful', `${data.patients.replace(/\+$/, '')} successful`],
    ['Bangalore', data.city],
    ['BDS, MDS (Prosthodontics & Implantology)', data.qualification],
    ['Clinic Open Now', customClinic ? 'Call to confirm opening' : 'Clinic Open Now'],
    ['Walk-ins welcomed till 8:00 PM', customClinic ? 'Contact clinic to confirm availability' : 'Walk-ins welcomed till 8:00 PM'],
    ['Premier boutique dental practice led by Dr. Aarav Mehta (MDS Prosthodontics & Implantology). Delivering painless, microscopy-enhanced dental excellence in Indiranagar, Bengaluru.', `${data.clinic} in ${data.area}, ${data.city}. Contact the clinic to learn more about available dental care.`],
    ['Instant Clinic Availability', 'Appointment Request'], ['INSTANT TOKEN RESERVATION', 'REQUEST AN APPOINTMENT'],
    ['Live Availability', 'Choose a service'], ['Available Slots (Dr. Mehta)', 'Preferred Service'],
    ['Zero Wait Time', 'Clinic will confirm'], ['Confirm Slot via WhatsApp', 'Continue on WhatsApp']
  ];

  const replacementMap = new Map(replacements);
  const replacementPattern = new RegExp(replacements.map(([source]) => source).sort((a, b) => b.length - a.length).map((source) => source.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|'), 'g');
  const replaceTemplateText = (text) => text.replace(replacementPattern, (matched) => replacementMap.get(matched));
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  let textNode;
  while ((textNode = walker.nextNode())) textNode.nodeValue = replaceTemplateText(textNode.nodeValue);
  // The source design's named patient quotes belong to its sample clinic.
  // Do not present those as reviews for a clinic supplied through the URL.
  if (customClinic) {
    document.querySelector('#testimonials')?.remove();
    document.querySelector('#technology')?.remove();
    document.querySelector('#technology-mobile')?.remove();
    document.querySelector('#clinic-finance')?.remove();
    document.querySelectorAll('#clinicDrawer p').forEach((paragraph) => {
      if (/emergency line/i.test(paragraph.textContent)) paragraph.closest('.p-3')?.remove();
    });
    document.querySelectorAll('#location-mobile p').forEach((paragraph) => {
      if (/24\/7|landmark:/i.test(paragraph.textContent)) paragraph.remove();
    });
    document.querySelectorAll('#desktop-site .p-3, #mobile-site .p-3').forEach((card) => {
      if (/15\+ Yrs|10k\+|10,000\+|100% IDA/i.test(card.textContent)) card.remove();
    });
    document.querySelectorAll('#mobile-site span').forEach((badge) => {
      if (/^IDA$|IDA Approved/i.test(badge.textContent.trim())) badge.remove();
    });
    // Update shorter phone/address forms and labels that differ between layouts.
    document.querySelectorAll('a[href^="tel:"]').forEach((link) => {
      const isEmergency = /emergency|pain emergency/i.test(`${link.title} ${link.getAttribute('aria-label') || ''} ${link.className}`);
      link.href = `tel:${digits(isEmergency ? data.emergency : data.phone)}`;
    });
  }
  document.querySelectorAll('#location-mobile .clinic-map-preview iframe').forEach((map) => {
    map.style.width = '100%';
    map.style.height = '100%';
    map.style.display = 'block';
  });
  document.querySelectorAll('img[alt], [data-alt], [title]').forEach((element) => {
    for (const attribute of ['alt', 'data-alt', 'title']) {
      if (!element.hasAttribute(attribute)) continue;
      element.setAttribute(attribute, replaceTemplateText(element.getAttribute(attribute)));
    }
  });

  document.title = `${data.clinic} | ${data.area}, ${data.city}`;
  document.querySelector('meta[name="description"]')?.setAttribute('content', `${data.clinic} in ${data.area}, ${data.city}. Explore treatments, meet ${data.doctor}, and book a visit.`);
  const safeAccent = /^#[\da-f]{3}(?:[\da-f]{3})?$/i.test(data.accent) ? data.accent : '#00685f';
  document.documentElement.style.setProperty('--clinic-primary', safeAccent);
  document.documentElement.style.setProperty('--clinic-primary-container', safeAccent);

  document.querySelectorAll('a[href^="tel:"]').forEach((link) => {
    const emergency = /emergency|pain emergency/i.test(`${link.title} ${link.getAttribute('aria-label') || ''} ${link.className}`);
    link.href = `tel:${(emergency ? data.emergency : data.phone).replace(/[^\d+]/g, '')}`;
  });
  const appointmentMessage = `Hello ${data.clinic}, I would like to ask about booking an appointment.`;
  const whatsappUrl = `https://wa.me/${digits(data.whatsapp)}?text=${encodeURIComponent(appointmentMessage)}`;
  document.querySelectorAll('a[href*="wa.me"]').forEach((link) => { link.href = whatsappUrl; });
  document.querySelectorAll('a[href*="maps.google.com"]').forEach((link) => { link.href = `https://maps.google.com/?q=${encodeURIComponent(data.address)}`; });
  document.querySelectorAll('img[data-location]').forEach((image) => {
    const map = document.createElement('iframe');
    map.className = image.className;
    map.title = `Map showing ${data.clinic}`;
    map.loading = 'lazy';
    map.referrerPolicy = 'no-referrer-when-downgrade';
    map.allowFullscreen = true;
    map.src = `https://maps.google.com/maps?q=${encodeURIComponent(data.address)}&output=embed`;
    map.style.border = '0';
    if (image.closest('.clinic-map-preview')) {
      map.style.width = '100%';
      map.style.height = '100%';
      map.style.display = 'block';
    }
    image.replaceWith(map);
  });

  // Open a patient-reviewed WhatsApp draft with only the name and chosen service.
  document.querySelectorAll('#desktop-booking-form, #mobile-booking-form').forEach((form) => {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const patientName = form.elements.patientName.value.trim().slice(0, 80);
      const service = form.elements.service.value.trim().slice(0, 100);
      const message = `Hello ${data.clinic}, my name is ${patientName}. I would like to book an appointment for ${service}. Please let me know the available appointment options.`;
      window.open(`https://wa.me/${digits(data.whatsapp)}?text=${encodeURIComponent(message)}`, '_blank', 'noopener');
    });
  });

  const bottomNav = document.getElementById('mobile-bottom-nav');
  if (bottomNav) {
    const items = [...bottomNav.querySelectorAll('a')];
    const setActiveNavItem = (active) => items.forEach((item) => {
      const selected = item === active;
      item.classList.toggle('is-active', selected);
      if (selected) item.setAttribute('aria-current', 'location');
      else item.removeAttribute('aria-current');
    });
    setActiveNavItem(items.find((item) => item.getAttribute('href') === '#') || items[0]);
    items.forEach((item) => item.addEventListener('click', () => setActiveNavItem(item)));
  }
})();

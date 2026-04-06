#!/usr/bin/env python3
"""Replace maps with full-page Avernus-themed interactive battlemaps."""
FILE = 'palace-of-gore-session.html'
SQ = 24

# ━━━ SVG HELPERS ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
I = '      '

# -- Avernus Palette --
BG       = '#0a0204'   # void background (red-black)
CAVE     = '#1a0808'   # cave rock
FLOOR    = '#6a4828'   # charred bone stone
FLOOR_LT = '#7a5838'   # lighter charred
FLOOR_DK = '#4a3018'   # darker charred
WALL_C   = '#120404'   # wall stroke color
BLOOD_C  = '#501010'   # blood pool fill
LEDGE_C  = '#5a3820'   # elevated ledge fill
BONE_C   = '#8a7a58'   # bone accent
LAVA_C   = '#cc4010'   # lava crack color
EMBER_C  = '#ff6020'   # ember / fire
GLYPH_C  = '#802020'   # infernal glyph
GOLD     = '#c9a96e'   # label gold
LABEL_DK = '#e8c090'   # labels on dark BG

def fl(x,y,w,h,c=FLOOR):
    return f'{I}<rect x="{x}" y="{y}" width="{w}" height="{h}" fill="{c}"/>'
def gr(x,y,w,h,pid='grid1'):
    return f'{I}<rect x="{x}" y="{y}" width="{w}" height="{h}" fill="url(#{pid})"/>'
def wl(x1,y1,x2,y2,sw=6):
    return f'{I}<line x1="{x1}" y1="{y1}" x2="{x2}" y2="{y2}" stroke="{WALL_C}" stroke-width="{sw}" stroke-linecap="round"/>'
def wlt(x1,y1,x2,y2):
    return wl(x1,y1,x2,y2,5)
def dash(x1,y1,x2,y2,c='#5a3018',sw=1.5):
    return f'{I}<line x1="{x1}" y1="{y1}" x2="{x2}" y2="{y2}" stroke="{c}" stroke-width="{sw}" stroke-dasharray="5,3"/>'
def tx(x,y,t,sz=9,c=LABEL_DK,b=False,anchor='middle'):
    fw = ' font-weight="bold"' if b else ''
    return f'{I}<text x="{x}" y="{y}" text-anchor="{anchor}" font-family="Georgia,serif" font-size="{sz}" fill="{c}"{fw}>{t}</text>'
def elev(x,y,w,h,eid='elev1'):
    return [fl(x,y,w,h,LEDGE_C), f'{I}<rect x="{x}" y="{y}" width="{w}" height="{h}" fill="url(#{eid})"/>']
def blood(cx,cy,rx,ry):
    return f'{I}<ellipse cx="{cx}" cy="{cy}" rx="{rx}" ry="{ry}" fill="url(#blood-grad)" stroke="#3a0606" stroke-width="1"/>'
def room_num(cx,cy,n):
    return [f'{I}<circle cx="{cx}" cy="{cy}" r="10" fill="{BG}" stroke="{GOLD}" stroke-width="1.5"/>',
            tx(cx,cy+4,str(n),9,GOLD,True)]
def dm_circ(cx,cy,r,fi,st,letter,fsz=7):
    return [f'{I}  <circle cx="{cx}" cy="{cy}" r="{r}" fill="{fi}" stroke="{st}" stroke-width="2"/>',
            f'{I}  <text x="{cx}" y="{cy+3}" text-anchor="middle" font-family="Georgia,serif" font-size="{fsz}" font-weight="bold" fill="#fff">{letter}</text>']
def dm_tri(cx,cy,fi,st,letter):
    return [f'{I}  <polygon points="{cx},{cy-7} {cx-7},{cy+5} {cx+7},{cy+5}" fill="{fi}" stroke="{st}" stroke-width="1.5"/>',
            f'{I}  <text x="{cx}" y="{cy+3}" text-anchor="middle" font-family="Georgia,serif" font-size="7" font-weight="bold" fill="#fff">{letter}</text>']
def dm_rect(cx,cy,fi,st,letter):
    return [f'{I}  <rect x="{cx-8}" y="{cy-5}" width="16" height="10" rx="2" fill="{fi}" stroke="{st}" stroke-width="1.5"/>',
            f'{I}  <text x="{cx}" y="{cy+3}" text-anchor="middle" font-family="Georgia,serif" font-size="6" font-weight="bold" fill="#fff">{letter}</text>']

# -- Terrain markers --
def bone_pile(x,y,label='bone pile'):
    return [f'{I}<circle cx="{x-4}" cy="{y}" r="4.5" fill="{BONE_C}" opacity="0.6" stroke="#5a4a30" stroke-width="0.5"/>',
            f'{I}<circle cx="{x+5}" cy="{y-2}" r="3.5" fill="{BONE_C}" opacity="0.5" stroke="#5a4a30" stroke-width="0.5"/>',
            f'{I}<circle cx="{x+2}" cy="{y+4}" r="4" fill="{BONE_C}" opacity="0.55" stroke="#5a4a30" stroke-width="0.5"/>',
            tx(x,y+14,label,5.5,'#9a8a68',False)]
def gore_splat(x,y,label='gore'):
    return [f'{I}<ellipse cx="{x}" cy="{y}" rx="9" ry="5" fill="#601010" opacity="0.45"/>',
            f'{I}<circle cx="{x-4}" cy="{y-3}" r="2.5" fill="#801010" opacity="0.35"/>',
            f'{I}<circle cx="{x+5}" cy="{y+2}" r="2" fill="#701010" opacity="0.3"/>',
            tx(x,y+13,label,5,'#903030',False)]
def weapon_frag(x,y,label='weapon debris'):
    return [f'{I}<line x1="{x-7}" y1="{y+5}" x2="{x+7}" y2="{y-5}" stroke="#5a4830" stroke-width="2" stroke-linecap="round"/>',
            f'{I}<line x1="{x-4}" y1="{y-5}" x2="{x+5}" y2="{y+4}" stroke="#4a3820" stroke-width="1.5" stroke-linecap="round"/>',
            f'{I}<circle cx="{x+6}" cy="{y-4}" r="2" fill="#6a5a40" opacity="0.5"/>',
            tx(x,y+14,label,5,'#8a7a58',False)]
def chain_seg(x,y,label='chains'):
    return [f'{I}<path d="M{x-10},{y} q5,-5 10,0 q5,5 10,0" fill="none" stroke="#5a4030" stroke-width="2" stroke-linecap="round"/>',
            f'{I}<path d="M{x-8},{y+5} q4,-4 8,0 q4,4 8,0" fill="none" stroke="#4a3020" stroke-width="1.5" opacity="0.6"/>',
            tx(x,y+16,label,5,'#7a6a50',False)]
def infernal_glyph(x,y,label='infernal glyph'):
    return [f'{I}<circle cx="{x}" cy="{y}" r="8" fill="none" stroke="{GLYPH_C}" stroke-width="0.8" opacity="0.5"/>',
            f'{I}<circle cx="{x}" cy="{y}" r="4" fill="none" stroke="{GLYPH_C}" stroke-width="0.6" opacity="0.4"/>',
            f'{I}<line x1="{x}" y1="{y-8}" x2="{x}" y2="{y+8}" stroke="{GLYPH_C}" stroke-width="0.4" opacity="0.3"/>',
            f'{I}<line x1="{x-8}" y1="{y}" x2="{x+8}" y2="{y}" stroke="{GLYPH_C}" stroke-width="0.4" opacity="0.3"/>',
            tx(x,y+16,label,5,GLYPH_C,False)]
def brazier(x,y,gid=None,label='brazier'):
    if gid is None: gid=f'bz{x}{y}'
    return [f'{I}<defs><radialGradient id="{gid}"><stop offset="0%" stop-color="#ffaa40" stop-opacity="0.3"/><stop offset="70%" stop-color="#ff4010" stop-opacity="0.1"/><stop offset="100%" stop-color="#ff4010" stop-opacity="0"/></radialGradient></defs>',
            f'{I}<circle cx="{x}" cy="{y}" r="40" fill="url(#{gid})"/>',
            f'{I}<circle cx="{x}" cy="{y}" r="5" fill="#2a1008" stroke="#cc6010" stroke-width="1.5"/>',
            f'{I}<circle cx="{x}" cy="{y}" r="2.5" fill="#ff8020" opacity="0.7"/>',
            tx(x,y+14,label,5,'#cc8040',False)]
def skull_deco(x,y):
    return [f'{I}<circle cx="{x}" cy="{y}" r="4.5" fill="#7a6a50" stroke="#4a3a20" stroke-width="0.6"/>',
            f'{I}<circle cx="{x-1.8}" cy="{y-1}" r="1.2" fill="#1a0a04"/>',
            f'{I}<circle cx="{x+1.8}" cy="{y-1}" r="1.2" fill="#1a0a04"/>',
            f'{I}<path d="M{x-1.5},{y+2} q1.5,1.5 3,0" fill="none" stroke="#1a0a04" stroke-width="0.5"/>']

def compass(cx,cy,r=16):
    S = []
    S.append(f'{I}<circle cx="{cx}" cy="{cy}" r="{r}" fill="rgba(10,2,4,0.6)" stroke="{GOLD}" stroke-width="1"/>')
    S.append(f'{I}<line x1="{cx}" y1="{cy-r}" x2="{cx}" y2="{cy+r}" stroke="{GOLD}" stroke-width="0.8"/>')
    S.append(f'{I}<line x1="{cx-r}" y1="{cy}" x2="{cx+r}" y2="{cy}" stroke="{GOLD}" stroke-width="0.8"/>')
    S.append(f'{I}<polygon points="{cx},{cy-r} {cx-3},{cy-4} {cx+3},{cy-4}" fill="{GOLD}"/>')
    S.append(tx(cx,cy-r-5,'N',9,GOLD,True))
    return S
def scale_bar(x,y):
    S = []
    S.append(f'{I}<line x1="{x}" y1="{y}" x2="{x+SQ*4}" y2="{y}" stroke="{GOLD}" stroke-width="1.5"/>')
    for i in range(5):
        sx = x + i * SQ
        S.append(f'{I}<line x1="{sx}" y1="{y-5}" x2="{sx}" y2="{y+5}" stroke="{GOLD}" stroke-width="1"/>')
    S.append(tx(x,y+13,'0',6,GOLD))
    S.append(tx(x+SQ*2,y+13,'10ft',6,GOLD))
    S.append(tx(x+SQ*4,y+13,'20ft',6,GOLD))
    return S

# -- Avernus atmosphere --
def avernus_bg(w,h,vid='vig1'):
    """Full-bleed Avernus background with vignette, lava cracks, embers."""
    S = []
    # Base void
    S.append(f'{I}<rect width="{w}" height="{h}" fill="{BG}"/>')
    # Red-tinted atmosphere
    S.append(f'{I}<rect width="{w}" height="{h}" fill="#200808" opacity="0.3"/>')
    # Vignette (dark edges)
    S.append(f'{I}<defs><radialGradient id="{vid}" cx="50%" cy="50%" r="55%"><stop offset="0%" stop-color="{BG}" stop-opacity="0"/><stop offset="80%" stop-color="{BG}" stop-opacity="0.6"/><stop offset="100%" stop-color="{BG}" stop-opacity="0.9"/></radialGradient></defs>')
    S.append(f'{I}<rect width="{w}" height="{h}" fill="url(#{vid})"/>')
    # Cave rock texture (surrounding area)
    S.append(f'{I}<defs><pattern id="cave-tex" width="60" height="60" patternUnits="userSpaceOnUse"><rect width="60" height="60" fill="{CAVE}"/><circle cx="15" cy="20" r="2" fill="#0a0204" opacity="0.3"/><circle cx="45" cy="40" r="1.5" fill="#0a0204" opacity="0.25"/><line x1="5" y1="35" x2="20" y2="38" stroke="#0a0204" stroke-width="0.5" opacity="0.2"/></pattern></defs>')
    S.append(f'{I}<rect width="{w}" height="{h}" fill="url(#cave-tex)" opacity="0.5"/>')
    return S

def avernus_embers(w,h,count=18):
    """Scatter ember particles across the background."""
    import random
    random.seed(42)
    S = []
    for _ in range(count):
        ex = random.randint(10,w-10)
        ey = random.randint(10,h-10)
        er = random.uniform(0.8,2.2)
        eo = random.uniform(0.15,0.5)
        S.append(f'{I}<circle cx="{ex}" cy="{ey}" r="{er:.1f}" fill="{EMBER_C}" opacity="{eo:.2f}"/>')
    return S

def lava_cracks(w,h,count=6):
    """Scattered lava crack lines in the surrounding rock."""
    import random
    random.seed(99)
    S = []
    for _ in range(count):
        x = random.randint(20,w-20)
        y = random.randint(20,h-20)
        dx = random.randint(-20,20)
        dy = random.randint(-15,15)
        S.append(f'{I}<line x1="{x}" y1="{y}" x2="{x+dx}" y2="{y+dy}" stroke="{LAVA_C}" stroke-width="1" opacity="0.2"/>')
        S.append(f'{I}<line x1="{x}" y1="{y}" x2="{x+dx}" y2="{y+dy}" stroke="#ff8030" stroke-width="0.4" opacity="0.3"/>')
    return S


# ━━━ SHARED SVG DEFS ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
def shared_defs(prefix=''):
    S = []
    S.append('      <defs>')
    S.append(f'        <pattern id="{prefix}grid1" width="{SQ}" height="{SQ}" patternUnits="userSpaceOnUse"><path d="M{SQ} 0L0 0 0 {SQ}" fill="none" stroke="rgba(200,160,100,0.1)" stroke-width="0.5"/></pattern>')
    S.append(f'        <pattern id="{prefix}elev1" width="7" height="7" patternUnits="userSpaceOnUse"><line x1="0" y1="7" x2="7" y2="0" stroke="rgba(120,80,30,0.45)" stroke-width="1.1"/></pattern>')
    S.append(f'        <radialGradient id="{prefix}blood-grad"><stop offset="0%" stop-color="#3a0404"/><stop offset="60%" stop-color="#601010" stop-opacity="0.7"/><stop offset="100%" stop-color="#501010" stop-opacity="0.15"/></radialGradient>')
    S.append(f'        <marker id="{prefix}arw1" markerWidth="8" markerHeight="6" refX="6" refY="3" orient="auto"><path d="M0,0 L0,6 L8,3 z" fill="{GOLD}"/></marker>')
    # Charred stone floor pattern
    S.append(f'        <pattern id="{prefix}stone-avg" width="48" height="48" patternUnits="userSpaceOnUse">'
             f'<rect width="48" height="48" fill="{FLOOR}"/>'
             f'<rect x="0" y="0" width="24" height="24" fill="rgba(0,0,0,0.06)"/>'
             f'<rect x="24" y="24" width="24" height="24" fill="rgba(0,0,0,0.06)"/>'
             f'<line x1="2" y1="20" x2="18" y2="22" stroke="rgba(100,40,10,0.12)" stroke-width="0.5"/>'
             f'<line x1="30" y1="8" x2="44" y2="10" stroke="rgba(100,40,10,0.1)" stroke-width="0.5"/>'
             f'</pattern>')
    S.append('      </defs>')
    return S


# ━━━ MAP 1: DRAINAGE TUNNELS ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
def gen_map1():
    VW, VH = 460, 870
    CX = 230  # center axis

    S = []
    S.append('  <div class="map-container">')
    S.append('    <div class="map-title">MAP 1 &mdash; The Drainage Tunnels</div>')
    S.append('    <div class="map-subtitle">Scale: 1 square = 5 ft &nbsp;|&nbsp; Hatching = raised ledge &nbsp;|&nbsp; Lower level beneath the Palace of Gore &nbsp;|&nbsp; Knee-deep blood = difficult terrain</div>')
    S.append(f'    <svg viewBox="0 0 {VW} {VH}" xmlns="http://www.w3.org/2000/svg" style="width:100%;display:block">')

    # Defs
    S.extend(shared_defs())

    # Avernus atmosphere background
    S.extend(avernus_bg(VW,VH))
    S.extend(lava_cracks(VW,VH,8))
    S.extend(avernus_embers(VW,VH,22))

    # Title overlay
    S.append(f'{I}<rect x="0" y="0" width="{VW}" height="28" fill="rgba(10,2,4,0.85)"/>')
    S.append(tx(VW//2,18,'THE DRAINAGE TUNNELS',12,GOLD,True))
    S.append(tx(CX,42,'&#9660; EAST DRAINAGE TUNNEL (DC 15 Athletics to clear rubble)',7,GOLD))

    # ── ENTRY HALL: 30x20ft = 144x96px ──
    EH_X, EH_Y, EH_W, EH_H = CX-72, 52, 144, 96
    S.append(fl(EH_X,EH_Y,EH_W,EH_H,'url(#stone-avg)'))
    S.append(gr(EH_X,EH_Y,EH_W,EH_H))
    # Blood pools
    S.append(blood(EH_X+36,EH_Y+42,18,11))
    S.append(blood(EH_X+108,EH_Y+42,18,11))
    # Terrain: bone piles in corners
    S.extend(bone_pile(EH_X+16,EH_Y+18,'bone pile'))
    S.extend(bone_pile(EH_X+EH_W-16,EH_Y+18,'bone pile'))
    # Terrain: gore drip from ceiling
    S.extend(gore_splat(EH_X+72,EH_Y+20,'ceiling gore'))
    # Braziers
    S.extend(brazier(EH_X,EH_Y+48,'bz_eh1','brazier'))
    S.extend(brazier(EH_X+EH_W,EH_Y+48,'bz_eh2','brazier'))
    # Walls
    S.append(wl(EH_X,EH_Y, CX-12,EH_Y))     # N left
    S.append(wl(CX+12,EH_Y, EH_X+EH_W,EH_Y)) # N right
    S.append(wl(EH_X,EH_Y+EH_H, CX-12,EH_Y+EH_H))
    S.append(wl(CX+12,EH_Y+EH_H, EH_X+EH_W,EH_Y+EH_H))
    S.append(wl(EH_X,EH_Y, EH_X,EH_Y+EH_H))
    S.append(wl(EH_X+EH_W,EH_Y, EH_X+EH_W,EH_Y+EH_H))
    S.append(tx(CX,EH_Y+38,'DRAINAGE ENTRY',10,LABEL_DK,True))
    S.append(tx(CX,EH_Y+50,'30 &times; 20 ft &middot; knee-deep blood',7,'#9a7a50'))
    S.extend(room_num(EH_X+14,EH_Y+12,'1'))

    # ── PASSAGE 1: 5ft wide, 40ft = 192px ──
    P1_X, P1_Y, P1_W, P1_H = CX-12, EH_Y+EH_H, 24, 192
    S.append(fl(P1_X,P1_Y,P1_W,P1_H,FLOOR_DK))
    S.append(gr(P1_X,P1_Y,P1_W,P1_H))
    S.append(wl(P1_X,P1_Y,P1_X,P1_Y+P1_H))
    S.append(wl(P1_X+P1_W,P1_Y,P1_X+P1_W,P1_Y+P1_H))
    S.append(tx(P1_X+P1_W+8,P1_Y+90,'5 ft passage',6,'#6a5030',False,'start'))
    # Rib cage arches decoration
    for ry in [P1_Y+40, P1_Y+100, P1_Y+160]:
        S.append(f'{I}<path d="M{P1_X},{ry} Q{CX},{ry-8} {P1_X+P1_W},{ry}" fill="none" stroke="{BONE_C}" stroke-width="0.8" opacity="0.3"/>')

    # ── GALLERY: floor 30x50=144x240, ledges 5ft each side ──
    GL_Y = P1_Y + P1_H
    GL_FX, GL_FW = CX-72, 144   # floor
    GL_LX, GL_LW = CX-96, 24    # left ledge
    GL_RX = CX+72               # right ledge
    GL_TW = 192                  # total width with ledges
    GL_H = 240
    # Ledges
    S.extend(elev(GL_LX,GL_Y,GL_LW,GL_H))
    S.append(gr(GL_LX,GL_Y,GL_LW,GL_H))
    S.extend(elev(GL_RX,GL_Y,GL_LW,GL_H))
    S.append(gr(GL_RX,GL_Y,GL_LW,GL_H))
    # Floor
    S.append(fl(GL_FX,GL_Y,GL_FW,GL_H,'url(#stone-avg)'))
    S.append(gr(GL_FX,GL_Y,GL_FW,GL_H))
    S.append(dash(GL_FX,GL_Y,GL_FX,GL_Y+GL_H))
    S.append(dash(GL_RX,GL_Y,GL_RX,GL_Y+GL_H))
    S.append(tx(GL_LX+12,GL_Y+GL_H//2,'+15 ft',5.5,'#8a6830'))
    S.append(tx(GL_RX+12,GL_Y+GL_H//2,'+15 ft',5.5,'#8a6830'))
    # Terrain: bone altar (south end)
    S.append(f'{I}<polygon points="{CX},{GL_Y+GL_H-28} {CX-16},{GL_Y+GL_H-4} {CX+16},{GL_Y+GL_H-4}" fill="#3a0808" stroke="#802020" stroke-width="1.5"/>')
    for sd in skull_deco(CX,GL_Y+GL_H-14): S.append(sd)
    S.append(tx(CX,GL_Y+GL_H-32,'BONE ALTAR',6,'#cc4040',True))
    S.append(tx(CX,GL_Y+GL_H+6,'difficult terrain 5ft radius',5,'#903030'))
    # Terrain: weapon fragments on gallery floor
    S.extend(weapon_frag(GL_FX+30,GL_Y+60))
    S.extend(weapon_frag(GL_FX+GL_FW-30,GL_Y+80))
    # Terrain: infernal glyphs
    S.extend(infernal_glyph(CX,GL_Y+100))
    # Terrain: chain segments on walls
    S.extend(chain_seg(GL_LX+12,GL_Y+40,'wall chains'))
    S.extend(chain_seg(GL_RX+12,GL_Y+180,'wall chains'))
    # Terrain: gore splatters
    S.extend(gore_splat(GL_FX+50,GL_Y+160,'gore'))
    S.extend(gore_splat(GL_FX+GL_FW-40,GL_Y+40,'gore'))
    # Skull decorations scattered on ledges
    for sx,sy in [(GL_LX+12,GL_Y+60),(GL_LX+12,GL_Y+180),(GL_RX+12,GL_Y+100),(GL_RX+12,GL_Y+200)]:
        for sd in skull_deco(sx,sy): S.append(sd)
    # Braziers on ledges
    S.extend(brazier(GL_LX+12,GL_Y+120,'bz_gl1',''))
    S.extend(brazier(GL_RX+12,GL_Y+120,'bz_gl2',''))
    # Walls
    S.append(wl(GL_LX,GL_Y,P1_X,GL_Y))
    S.append(wl(P1_X+P1_W,GL_Y,GL_RX+GL_LW,GL_Y))
    S.append(wl(GL_LX,GL_Y+GL_H,CX-12,GL_Y+GL_H))
    S.append(wl(CX+12,GL_Y+GL_H,GL_RX+GL_LW,GL_Y+GL_H))
    S.append(wl(GL_LX,GL_Y,GL_LX,GL_Y+20))     # W top before bypass
    S.append(wl(GL_LX,GL_Y+38,GL_LX,GL_Y+GL_H)) # W below bypass
    S.append(wl(GL_RX+GL_LW,GL_Y,GL_RX+GL_LW,GL_Y+GL_H))
    S.append(tx(CX,GL_Y+34,'BLOOD CHANNEL',10,LABEL_DK,True))
    S.append(tx(CX,GL_Y+48,'30 &times; 50 ft &middot; knee-deep blood &middot; maw demons patrol here',7,'#9a7a50'))
    S.extend(room_num(GL_FX+14,GL_Y+12,'2'))

    # ── BYPASS CRAWL ──
    BY_X, BY_Y, BY_W, BY_H = GL_LX-18, GL_Y+10, 14, 140
    S.append(fl(BY_X,BY_Y,BY_W,BY_H,'#4a3818'))
    S.append(wl(BY_X,BY_Y,BY_X,BY_Y+BY_H,3))
    S.append(wl(BY_X+BY_W,BY_Y,BY_X+BY_W,BY_Y+BY_H,3))
    S.append(wl(BY_X,BY_Y,BY_X+BY_W,BY_Y,3))
    S.append(wl(BY_X,BY_Y+BY_H,BY_X+BY_W,BY_Y+BY_H,3))
    S.append(dash(BY_X+BY_W,BY_Y+10,GL_LX,BY_Y+10,'#5a4020',1.2))
    for i,ch in enumerate('BYPASS'):
        S.append(tx(BY_X-6,BY_Y+20+i*14,ch,7,'#60a050',True))
    S.append(tx(BY_X-6,BY_Y+BY_H+10,'DC 16',6,'#60a050',True))
    S.append(tx(BY_X-6,BY_Y+BY_H+20,'Stealth',5.5,'#60a050'))

    # ── PASSAGE 2: 5ft, 15ft = 72px ──
    P2_X, P2_Y, P2_W, P2_H = CX-12, GL_Y+GL_H, 24, 72
    S.append(fl(P2_X,P2_Y,P2_W,P2_H,FLOOR_DK))
    S.append(gr(P2_X,P2_Y,P2_W,P2_H))
    S.append(wl(P2_X,P2_Y,P2_X,P2_Y+P2_H))
    S.append(wl(P2_X+P2_W,P2_Y,P2_X+P2_W,P2_Y+P2_H))

    # ── ANTECHAMBER: 30x20ft = 144x96px ──
    AC_X, AC_Y, AC_W, AC_H = CX-72, P2_Y+P2_H, 144, 96
    S.append(fl(AC_X,AC_Y,AC_W,AC_H,FLOOR_LT))
    S.append(gr(AC_X,AC_Y,AC_W,AC_H))
    # Terrain: weapon rack
    S.extend(weapon_frag(AC_X+24,AC_Y+30,'weapon rack'))
    # Terrain: bone pile near door
    S.extend(bone_pile(AC_X+AC_W-20,AC_Y+70,'bone pile'))
    # Terrain: infernal glyph on floor
    S.extend(infernal_glyph(CX,AC_Y+50,'ward glyph'))
    # Interactive door
    S.append(f'{I}<g class="interactive-obj" id="exit-door" data-state="closed" onclick="toggleMapObj(this)" style="cursor:pointer">')
    S.append(f'{I}  <rect x="{AC_X+AC_W+2}" y="{AC_Y+36}" width="10" height="24" fill="#4a2010" stroke="#2a1008" stroke-width="1.5" rx="1"/>')
    S.append(f'{I}  <circle cx="{AC_X+AC_W+4}" cy="{AC_Y+48}" r="1.5" fill="#aa8040"/>')
    S.append(f'{I}  <rect class="obj-overlay" x="{AC_X+AC_W+1}" y="{AC_Y+35}" width="12" height="26" fill="none" stroke="#40a040" stroke-width="1.5" stroke-dasharray="3,2" rx="1" style="display:none"/>')
    S.append(f'{I}</g>')
    # Walls
    S.append(wl(AC_X,AC_Y,P2_X,AC_Y))
    S.append(wl(P2_X+P2_W,AC_Y,AC_X+AC_W,AC_Y))
    S.append(wl(AC_X,AC_Y+AC_H,AC_X+AC_W,AC_Y+AC_H))
    S.append(wl(AC_X,AC_Y,AC_X,AC_Y+AC_H))
    S.append(wl(AC_X+AC_W,AC_Y,AC_X+AC_W,AC_Y+34))
    S.append(wl(AC_X+AC_W,AC_Y+62,AC_X+AC_W,AC_Y+AC_H))
    S.append(tx(CX,AC_Y+38,'ANTECHAMBER',10,LABEL_DK,True))
    S.append(tx(CX,AC_Y+52,'30 &times; 20 ft',7,'#9a7a50'))
    S.extend(room_num(AC_X+14,AC_Y+12,'3'))
    # Exit arrow
    S.append(f'{I}<line x1="{AC_X+AC_W+16}" y1="{AC_Y+48}" x2="{AC_X+AC_W+50}" y2="{AC_Y+48}" stroke="{GOLD}" stroke-width="2" marker-end="url(#arw1)"/>')
    S.append(tx(AC_X+AC_W+68,AC_Y+42,'THRONE',7,GOLD,False,'start'))
    S.append(tx(AC_X+AC_W+68,AC_Y+54,'ROOM',7,GOLD,False,'start'))

    # ── DM-ONLY LAYER ──
    S.append(f'{I}<g class="dm-only">')
    # Maw Demon 1: patrolling blood channel (mid-north)
    S.extend(dm_circ(CX-30,GL_Y+80,11,'#6a0c0c','#cc2020','MW',7))
    S.append(f'{I}  <text x="{CX-30}" y="{GL_Y+96}" text-anchor="middle" font-family="Georgia,serif" font-size="4.5" fill="#cc4040">Maw Demon</text>')
    # Maw Demon 2: patrolling blood channel (mid-south)
    S.extend(dm_circ(CX+30,GL_Y+180,11,'#6a0c0c','#cc2020','MW',7))
    S.append(f'{I}  <text x="{CX+30}" y="{GL_Y+196}" text-anchor="middle" font-family="Georgia,serif" font-size="4.5" fill="#cc4040">Maw Demon</text>')
    # Bone spear traps (pressure plates)
    S.extend(dm_tri(CX,P1_Y+60,'#c08000','#ffcc00','T'))
    S.append(f'{I}  <text x="{CX}" y="{P1_Y+75}" text-anchor="middle" font-family="Georgia,serif" font-size="4.5" fill="#ffcc00">bone spear trap</text>')
    S.append(f'{I}  <text x="{CX}" y="{P1_Y+83}" text-anchor="middle" font-family="Georgia,serif" font-size="4" fill="#cc9900">DC 15 Perc / DC 14 Dex / 3d8</text>')
    S.extend(dm_tri(CX,GL_Y+GL_H+36,'#c08000','#ffcc00','T'))
    S.append(f'{I}  <text x="{CX}" y="{GL_Y+GL_H+50}" text-anchor="middle" font-family="Georgia,serif" font-size="4.5" fill="#ffcc00">bone spear trap</text>')
    # Grozz + hobgoblin guards in antechamber
    S.extend(dm_circ(CX,AC_Y+50,9,'#1a4018','#40a030','G'))
    S.append(f'{I}  <text x="{CX}" y="{AC_Y+64}" text-anchor="middle" font-family="Georgia,serif" font-size="4.5" fill="#40a030">Cpt. Grozz (will surrender)</text>')
    S.extend(dm_rect(CX-40,AC_Y+70,'#2a4820','#507040','hg'))
    S.extend(dm_rect(CX+40,AC_Y+70,'#2a4820','#507040','hg'))
    S.extend(dm_rect(CX-40,AC_Y+84,'#2a4820','#507040','hg'))
    S.extend(dm_rect(CX+40,AC_Y+84,'#2a4820','#507040','hg'))
    S.extend(dm_rect(CX,AC_Y+84,'#2a4820','#507040','hg'))
    S.append(f'{I}  <text x="{CX}" y="{AC_Y+18}" text-anchor="middle" font-family="Georgia,serif" font-size="4.5" fill="#507040">5 hobgoblin guards (leave with Grozz if freed)</text>')
    # Legend
    lx, ly0 = VW-80, 52
    S.append(f'{I}  <rect x="{lx}" y="{ly0}" width="70" height="130" fill="rgba(10,2,4,0.9)" stroke="{GOLD}" stroke-width="1" rx="3"/>')
    S.append(f'{I}  <text x="{lx+35}" y="{ly0+14}" text-anchor="middle" font-family="Georgia,serif" font-size="7" font-weight="bold" fill="{GOLD}">ENCOUNTERS</text>')
    legs = [('cir','#6a0c0c','#cc2020','MW','Maw Demon'),
            ('tri','#c08000','#ffcc00','T','Bone Spear Trap'),
            ('cir','#1a4018','#40a030','G','Cpt. Grozz'),
            ('rec','#2a4820','#507040','hg','Hobgoblin Guard')]
    ly = ly0 + 28
    for sh,fi,st,lt,nm in legs:
        if sh=='tri':
            S.append(f'{I}  <polygon points="{lx+10},{ly-3} {lx+7},{ly+3} {lx+13},{ly+3}" fill="{fi}" stroke="{st}" stroke-width="1"/>')
        elif sh=='rec':
            S.append(f'{I}  <rect x="{lx+7}" y="{ly-3}" width="6" height="6" rx="1" fill="{fi}" stroke="{st}" stroke-width="1"/>')
        else:
            S.append(f'{I}  <circle cx="{lx+10}" cy="{ly}" r="4" fill="{fi}" stroke="{st}" stroke-width="1"/>')
        S.append(f'{I}  <text x="{lx+18}" y="{ly+3}" font-family="Georgia,serif" font-size="5.5" fill="#d0c0a0">{nm}</text>')
        ly += 20
    S.append(f'{I}</g>')

    # Compass + Scale
    S.extend(compass(VW-50,VH-50))
    S.extend(scale_bar(30,VH-35))

    S.append('    </svg>')
    S.append('    <div class="map-note">Player Mode hides monster positions, traps, and DM legend. Bypass crawl (green, west) allows sneaking past the maw demons with DC 16 group Stealth (disadvantage in blood unless dry path found). Grozz and his 5 hobgoblins will surrender &mdash; freeing them removes 6 hobgoblins from the boss fight. Click the exit door to toggle open state.</div>')
    S.append('  </div>')
    return '\n'.join(S)


# ━━━ MAP 2: BOSS ARENA (3 PHASES) ━━━━━━━━━━━━━━━━━━━━━━━━

# Room geometry (unchanged from before)
P1_RX, P1_RY, P1_RW, P1_RH = 94, 48, 192, 288
P1_DX, P1_DY, P1_DW, P1_DH = 142, 48, 96, 72
P1_BLX, P1_BLY, P1_BLW, P1_BLH = 70, 80, 24, 96
P1_BRX = 286
P2_RX, P2_RY, P2_RW, P2_RH = 118, 80, 144, 192
CAGE_CX, CAGE_CY, CAGE_R = 190, 176, 24
M2_VW, M2_VH_P1, M2_VH_P2 = 460, 450, 380

def gen_phase1():
    """Phase 1: Throne of Gore."""
    S = []
    rx,ry,rw,rh = P1_RX,P1_RY,P1_RW,P1_RH
    dx,dy,dw,dh = P1_DX,P1_DY,P1_DW,P1_DH
    mid = rx + rw//2

    S.append(f'{I}<rect x="0" y="0" width="{M2_VW}" height="28" fill="rgba(10,2,4,0.85)"/>')
    S.append(tx(M2_VW//2,18,'PHASE 1 &mdash; THE THRONE OF GORE',11,GOLD,True))

    # Main floor
    S.append(fl(rx,ry,rw,rh,'url(#stone-avg)'))
    S.append(gr(rx,ry,rw,rh,'grid1'))

    # Dais
    S.extend(elev(dx,dy,dw,dh))
    S.append(gr(dx,dy,dw,dh,'grid1'))
    S.append(dash(dx,dy+dh,dx+dw,dy+dh))
    S.append(tx(mid,dy+dh+12,'+5 ft raised dais',6,'#9a7030'))

    # Blood pools
    S.append(blood(128,220,24,16))
    S.append(tx(128,224,'blood pool',5.5,'#cc3030'))
    S.append(tx(128,233,'difficult terrain',4.5,'#903030'))
    S.append(blood(252,220,24,16))
    S.append(tx(252,224,'blood pool',5.5,'#cc3030'))

    # Bone Pillars (interactive)
    for i,(px,py) in enumerate([(118,150),(262,150),(118,268),(262,268)],1):
        S.append(f'{I}<g class="interactive-obj pillar-obj" id="pillar-{i}" data-state="intact" onclick="toggleMapObj(this)" style="cursor:pointer">')
        S.append(f'{I}  <circle cx="{px}" cy="{py}" r="9" fill="#5a4830" stroke="#3a2818" stroke-width="2.5"/>')
        S.append(f'{I}  <circle cx="{px}" cy="{py}" r="4.5" fill="{BONE_C}"/>')
        for sd in skull_deco(px,py-1): S.append(sd.replace(I,I+'  '))
        S.append(f'{I}  <text x="{px}" y="{py+16}" text-anchor="middle" font-family="Georgia,serif" font-size="5" fill="{LABEL_DK}">pillar P{i}</text>')
        S.append(f'{I}  <g class="obj-overlay" style="display:none"><line x1="{px-9}" y1="{py-9}" x2="{px+9}" y2="{py+9}" stroke="#ff3030" stroke-width="2.5"/><line x1="{px+9}" y1="{py-9}" x2="{px-9}" y2="{py+9}" stroke="#ff3030" stroke-width="2.5"/></g>')
        S.append(f'{I}</g>')

    # Terrain objects
    S.extend(bone_pile(rx+24,ry+rh-30,'bone pile'))
    S.extend(bone_pile(rx+rw-24,ry+rh-30,'bone pile'))
    S.extend(gore_splat(mid-30,ry+180,'gore splatter'))
    S.extend(gore_splat(mid+30,ry+140,'gore drip'))
    S.extend(weapon_frag(rx+40,ry+100,'weapon debris'))
    S.extend(weapon_frag(rx+rw-40,ry+200,'broken shields'))
    S.extend(chain_seg(rx+10,ry+180,'hanging chains'))
    S.extend(chain_seg(rx+rw-10,ry+120,'hanging chains'))
    S.extend(infernal_glyph(mid,ry+rh-60,'ward circle'))

    # Gore Throne (interactive)
    S.append(f'{I}<g class="interactive-obj" id="throne-obj" data-state="intact" onclick="toggleMapObj(this)" style="cursor:pointer">')
    S.append(f'{I}  <rect x="162" y="56" width="56" height="44" fill="#1a0808" stroke="#5a1818" stroke-width="2" rx="2"/>')
    for px in [170,190,210]:
        S.append(f'{I}  <line x1="{px}" y1="56" x2="{px}" y2="44" stroke="#3a1010" stroke-width="2.5" stroke-linecap="round"/>')
    S.append(f'{I}  <rect x="166" y="42" width="48" height="5" fill="#2a0808" rx="1"/>')
    for sd in skull_deco(178,50): S.append(sd.replace(I,I+'  '))
    for sd in skull_deco(202,50): S.append(sd.replace(I,I+'  '))
    S.append(tx(190,82,'GORE THRONE',7,GOLD,True))
    S.append(f'{I}  <circle id="aura-15" cx="190" cy="78" r="{SQ*3}" fill="none" stroke="#80a040" stroke-width="0.8" stroke-dasharray="4,3" opacity="0.3"/>')
    S.append(f'{I}  <circle id="aura-30" cx="190" cy="78" r="{SQ*6}" fill="none" stroke="#80a040" stroke-width="0.8" stroke-dasharray="4,3" opacity="0.15"/>')
    S.append(f'{I}  <text x="{190+SQ*3+4}" y="78" font-family="Georgia,serif" font-size="5" fill="#80a040" text-anchor="start" opacity="0.5">15ft aura</text>')
    S.append(f'{I}  <text x="{190+SQ*6+4}" y="78" font-family="Georgia,serif" font-size="5" fill="#80a040" text-anchor="start" opacity="0.3">30ft (on throne)</text>')
    S.append(f'{I}  <g class="obj-overlay" style="display:none">')
    S.append(f'{I}    <line x1="162" y1="56" x2="218" y2="100" stroke="#ff2020" stroke-width="3" opacity="0.7"/>')
    S.append(f'{I}    <line x1="218" y1="56" x2="162" y2="100" stroke="#ff2020" stroke-width="3" opacity="0.7"/>')
    S.append(tx(190,112,'DESTROYED &mdash; aura shrinks to 15ft',6,'#ff4040'))
    S.append(f'{I}  </g>')
    S.append(f'{I}</g>')

    # Phylactery
    S.append(f'{I}<rect x="160" y="90" width="6" height="10" fill="#b88010" stroke="#ddaa20" stroke-width="1" rx="1"/>')
    S.append(f'{I}<text x="155" y="108" text-anchor="middle" font-family="Georgia,serif" font-size="5" fill="#ddaa20" class="dm-only">phylactery</text>')

    # Barracks Door (interactive)
    S.append(f'{I}<g class="interactive-obj" id="barracks-door" data-state="open" onclick="toggleMapObj(this)" style="cursor:pointer">')
    S.append(f'{I}  <rect x="{mid-14}" y="{ry-5}" width="28" height="10" fill="#3a1808" stroke="#2a0804" stroke-width="2" rx="1"/>')
    S.append(tx(mid,ry-10,'BARRACKS DOOR',6,'#cc8040',True))
    S.append(f'{I}  <g class="obj-overlay" style="display:none"><rect x="{mid-16}" y="{ry-7}" width="32" height="14" fill="none" stroke="#40a040" stroke-width="2" rx="1"/>')
    S.append(tx(mid,ry-10,'SEALED',6,'#40ff40',True))
    S.append(f'{I}  </g>')
    S.append(f'{I}</g>')

    # Balconies
    S.extend(elev(P1_BLX,P1_BLY,P1_BLW,P1_BLH))
    S.append(gr(P1_BLX,P1_BLY,P1_BLW,P1_BLH,'grid1'))
    S.append(dash(rx,P1_BLY,rx,P1_BLY+P1_BLH))
    S.append(tx(82,P1_BLY+38,'+15ft',5,'#8a6830'))
    S.append(tx(82,P1_BLY+50,'ALCOVE',5.5,LABEL_DK,True))
    S.extend(elev(P1_BRX,P1_BLY,P1_BLW,P1_BLH))
    S.append(gr(P1_BRX,P1_BLY,P1_BLW,P1_BLH,'grid1'))
    S.append(dash(P1_BRX,P1_BLY,P1_BRX,P1_BLY+P1_BLH))
    S.append(tx(298,P1_BLY+38,'+15ft',5,'#8a6830'))
    S.append(tx(298,P1_BLY+50,'ALCOVE',5.5,LABEL_DK,True))

    # Braziers
    S.extend(brazier(rx,140,'bz_t1',''))
    S.extend(brazier(rx+rw,140,'bz_t2',''))
    S.extend(brazier(rx,260,'bz_t3',''))
    S.extend(brazier(rx+rw,260,'bz_t4',''))

    # Walls
    S.append(wl(rx,ry,mid-14,ry))
    S.append(wl(mid+14,ry,rx+rw,ry))
    S.append(wl(rx,ry+rh,mid-24,ry+rh))
    S.append(wl(mid+24,ry+rh,rx+rw,ry+rh))
    S.append(wl(rx,ry,rx,P1_BLY))
    S.append(wl(rx,P1_BLY+P1_BLH,rx,ry+rh))
    S.append(wl(rx+rw,ry,rx+rw,P1_BLY))
    S.append(wl(rx+rw,P1_BLY+P1_BLH,rx+rw,ry+rh))
    S.append(wlt(P1_BLX,P1_BLY,P1_BLX,P1_BLY+P1_BLH))
    S.append(wlt(P1_BLX,P1_BLY,rx,P1_BLY))
    S.append(wlt(P1_BLX,P1_BLY+P1_BLH,rx,P1_BLY+P1_BLH))
    S.append(wlt(P1_BRX+P1_BLW,P1_BLY,P1_BRX+P1_BLW,P1_BLY+P1_BLH))
    S.append(wlt(rx+rw,P1_BLY,P1_BRX+P1_BLW,P1_BLY))
    S.append(wlt(rx+rw,P1_BLY+P1_BLH,P1_BRX+P1_BLW,P1_BLY+P1_BLH))
    S.append(f'{I}<path d="M{mid-24},{ry+rh} Q{mid},{ry+rh-14} {mid+24},{ry+rh}" fill="none" stroke="#5a3010" stroke-width="2"/>')
    S.append(f'{I}<line x1="{mid}" y1="{ry+rh+22}" x2="{mid}" y2="{ry+rh+6}" stroke="{GOLD}" stroke-width="2" marker-end="url(#arw1)"/>')
    S.append(tx(mid,ry+rh+34,'from ANTECHAMBER',7,GOLD))

    S.append(tx(mid,250,'THRONE ROOM',11,LABEL_DK,True))
    S.append(tx(mid,264,'40 &times; 60 ft &middot; 30 ft ceiling',7,'#9a7a50'))

    # DM layer
    S.append(f'{I}<g class="dm-only">')
    S.extend(dm_circ(190,72,12,'#5a0a6a','#b030e0','BB',9))
    S.extend(dm_circ(230,130,10,'#8b4a00','#cc7020','GT',7))
    S.append(f'{I}  <text x="230" y="145" text-anchor="middle" font-family="Georgia,serif" font-size="4.5" fill="#cc7020">Thakk</text>')
    S.extend(dm_tri(120,100,'#8b1a1a','#dd4040','BC'))
    S.append(f'{I}  <text x="120" y="115" text-anchor="middle" font-family="Georgia,serif" font-size="4.5" fill="#dd4040">ceiling</text>')
    for hx,hy in [(152,290),(176,290),(204,290),(228,290)]:
        S.extend(dm_circ(hx,hy,6,'#2a4820','#507040','hg',5))
    S.append(f'{I}  <text x="190" y="278" text-anchor="middle" font-family="Georgia,serif" font-size="4.5" fill="#507040">hobgoblin veterans (AC 18, 55 HP)</text>')
    for mx in [142,166,190,214,238]:
        S.extend(dm_rect(mx,310,'#4a4030','#8a7060','M'))
    S.append(f'{I}  <text x="190" y="326" text-anchor="middle" font-family="Georgia,serif" font-size="5" fill="#8a7060">mook screen (1 HP each)</text>')
    # Legend
    lx = M2_VW - 90
    S.append(f'{I}  <rect x="{lx}" y="190" width="80" height="130" fill="rgba(10,2,4,0.9)" stroke="{GOLD}" stroke-width="1" rx="3"/>')
    S.append(f'{I}  <text x="{lx+40}" y="204" text-anchor="middle" font-family="Georgia,serif" font-size="7" font-weight="bold" fill="{GOLD}">ENEMIES</text>')
    for j,(sh,fi,st,lt,nm) in enumerate([
        ('cir','#5a0a6a','#b030e0','BB','Bitter Breath'),
        ('cir','#8b4a00','#cc7020','GT','Thakk (tank)'),
        ('tri','#8b1a1a','#dd4040','BC','Consort (ceil)'),
        ('cir','#2a4820','#507040','hg','Hobgoblin'),
        ('rec','#4a4030','#8a7060','M','Mook (1HP)')]):
        ly = 220 + j*20
        if sh=='tri':
            S.append(f'{I}  <polygon points="{lx+10},{ly-3} {lx+7},{ly+3} {lx+13},{ly+3}" fill="{fi}" stroke="{st}" stroke-width="1"/>')
        elif sh=='rec':
            S.append(f'{I}  <rect x="{lx+7}" y="{ly-3}" width="6" height="6" rx="1" fill="{fi}" stroke="{st}" stroke-width="1"/>')
        else:
            S.append(f'{I}  <circle cx="{lx+10}" cy="{ly}" r="4" fill="{fi}" stroke="{st}" stroke-width="1"/>')
        S.append(f'{I}  <text x="{lx+18}" y="{ly+3}" font-family="Georgia,serif" font-size="5.5" fill="#d0c0a0">{nm}</text>')
    S.append(f'{I}</g>')
    return S


def gen_phase2():
    """Phase 2: The Siphon — Cage Chamber."""
    S = []
    rx,ry,rw,rh = P2_RX,P2_RY,P2_RW,P2_RH
    mid = rx + rw//2
    ccx,ccy = CAGE_CX,CAGE_CY

    S.append(f'{I}<rect x="0" y="0" width="{M2_VW}" height="28" fill="rgba(10,2,4,0.85)"/>')
    S.append(tx(M2_VW//2,18,'PHASE 2 &mdash; THE SIPHON',11,GOLD,True))

    S.append(fl(rx,ry,rw,rh,FLOOR_DK))
    S.append(gr(rx,ry,rw,rh,'grid1'))

    # Blood troughs
    S.append(f'{I}<rect x="{rx}" y="138" width="{rw}" height="14" fill="{BLOOD_C}" stroke="#3a0606" stroke-width="0.8" rx="2"/>')
    S.append(tx(rx+rw+8,146,'blood trough',5.5,'#903030',False,'start'))
    S.append(tx(rx+rw+8,155,'difficult terrain',4.5,'#703030',False,'start'))
    S.append(f'{I}<rect x="{rx}" y="222" width="{rw}" height="14" fill="{BLOOD_C}" stroke="#3a0606" stroke-width="0.8" rx="2"/>')
    S.append(tx(rx+rw+8,230,'blood trough',5.5,'#903030',False,'start'))

    # Rubble NW
    S.append(f'{I}<polygon points="{rx},{ry} {rx+65},{ry} {rx+50},{ry+40} {rx+28},{ry+52} {rx},{ry+52}" fill="#4a3828" stroke="#3a2818" stroke-width="1"/>')
    for cx2,cy2,r2 in [(rx+20,ry+20,7),(rx+42,ry+16,6),(rx+26,ry+40,5),(rx+48,ry+34,4)]:
        S.append(f'{I}<circle cx="{cx2}" cy="{cy2}" r="{r2}" fill="#5a4838" stroke="#3a2818" stroke-width="0.5"/>')
    S.append(tx(rx+30,ry+64,'COLLAPSED RUBBLE',5.5,LABEL_DK,True))
    S.append(tx(rx+30,ry+73,'half cover',5,'#8a7a60'))

    # Terrain
    S.extend(bone_pile(rx+rw-24,ry+rh-30,'bone pile'))
    S.extend(gore_splat(rx+30,ry+rh-50,'gore'))
    S.extend(chain_seg(rx+8,ccy-40,'wall chains'))
    S.extend(chain_seg(rx+rw-8,ccy+40,'wall chains'))
    S.extend(weapon_frag(rx+rw-30,ry+30,'debris'))

    # Cage
    S.append(f'{I}<radialGradient id="cage-glow"><stop offset="0%" stop-color="#a0c0ff" stop-opacity="0.35"/><stop offset="100%" stop-color="#a0c0ff" stop-opacity="0"/></radialGradient>')
    S.append(f'{I}<circle cx="{ccx}" cy="{ccy}" r="{CAGE_R+20}" fill="url(#cage-glow)"/>')
    S.append(f'{I}<circle cx="{ccx}" cy="{ccy}" r="{CAGE_R}" fill="none" stroke="#5a6a7a" stroke-width="3"/>')
    for bx in range(ccx-CAGE_R+6,ccx+CAGE_R,8):
        S.append(f'{I}<line x1="{bx}" y1="{ccy-CAGE_R}" x2="{bx}" y2="{ccy+CAGE_R}" stroke="#5a6a7a" stroke-width="0.8" opacity="0.5"/>')
    S.append(f'{I}<circle cx="{ccx}" cy="{ccy}" r="10" fill="#c0d8ff" opacity="0.12"/>')
    S.append(tx(ccx,ccy-CAGE_R-10,'MOONKITE CAGE',7,'#80a0dd',True))
    S.append(tx(ccx,ccy-CAGE_R-2,'10 ft sphere, suspended',5.5,'#6080aa'))

    # 4 Siphon Chains (interactive)
    chains = [
        (1, ccx,ccy, rx,ccy-30, 'W wall'),
        (2, ccx,ccy, rx+rw,ccy-30, 'E wall'),
        (3, ccx,ccy, ccx,ry+rh-12, 'floor'),
        (4, ccx,ccy, ccx,ry+12, 'ceiling'),
    ]
    for cid,x1,y1,x2,y2,label in chains:
        S.append(f'{I}<g class="interactive-obj chain-obj" id="chain-{cid}" data-state="intact" onclick="toggleChain({cid})" style="cursor:pointer">')
        S.append(f'{I}  <line x1="{x1}" y1="{y1}" x2="{x2}" y2="{y2}" stroke="#cc6000" stroke-width="3.5" stroke-linecap="round" class="chain-line"/>')
        S.append(f'{I}  <line x1="{x1}" y1="{y1}" x2="{x2}" y2="{y2}" stroke="#ff8020" stroke-width="1.5" stroke-dasharray="8,6" opacity="0.5" class="chain-pulse"/>')
        S.append(f'{I}  <circle cx="{x2}" cy="{y2}" r="6" fill="#6a3808" stroke="#cc6000" stroke-width="1.5" class="chain-anchor"/>')
        S.append(f'{I}  <text x="{x2}" y="{y2+14}" text-anchor="middle" font-family="Georgia,serif" font-size="5" fill="#cc8040">Chain {cid} ({label})</text>')
        S.append(f'{I}  <g class="obj-overlay" style="display:none">')
        S.append(f'{I}    <line x1="{x1}" y1="{y1}" x2="{x2}" y2="{y2}" stroke="#444" stroke-width="1" stroke-dasharray="4,4" opacity="0.3"/>')
        S.append(f'{I}    <text x="{(x1+x2)//2}" y="{(y1+y2)//2}" text-anchor="middle" font-family="Georgia,serif" font-size="7" fill="#ff4040" font-weight="bold">BROKEN</text>')
        S.append(f'{I}  </g>')
        S.append(f'{I}</g>')

    # Walls
    S.append(wl(rx,ry,rx+rw,ry))
    S.append(wl(rx,ry+rh,mid-24,ry+rh))
    S.append(wl(mid+24,ry+rh,rx+rw,ry+rh))
    S.append(wl(rx,ry,rx,ry+rh))
    S.append(wl(rx+rw,ry,rx+rw,ry+rh))
    S.append(f'{I}<path d="M{mid-24},{ry+rh} Q{mid},{ry+rh-12} {mid+24},{ry+rh}" fill="none" stroke="#5a3010" stroke-width="2"/>')
    S.append(f'{I}<line x1="{mid}" y1="{ry+rh+20}" x2="{mid}" y2="{ry+rh+6}" stroke="{GOLD}" stroke-width="2" marker-end="url(#arw1)"/>')
    S.append(tx(mid,ry+rh+32,'from SPIRAL DESCENT',7,GOLD))
    S.append(tx(mid,ry+rh-18,'CAGE CHAMBER',10,LABEL_DK,True))
    S.append(tx(mid,ry+rh-6,'30 &times; 40 ft &middot; 15 ft ceiling',7,'#9a7a50'))

    # DM layer
    S.append(f'{I}<g class="dm-only">')
    S.extend(dm_circ(ccx+22,ccy+12,12,'#5a0a6a','#b030e0','BB',9))
    S.append(f'{I}  <text x="{ccx+22}" y="{ccy+29}" text-anchor="middle" font-family="Georgia,serif" font-size="4.5" fill="#b030e0">gripping chains</text>')
    S.extend(dm_circ(rx+32,144,9,'#6a0c0c','#cc2020','MW',6))
    S.extend(dm_circ(rx+rw-32,228,9,'#6a0c0c','#cc2020','MW',6))
    S.append(f'{I}  <text x="{rx+32}" y="160" text-anchor="middle" font-family="Georgia,serif" font-size="4.5" fill="#cc4040">Maw Demon</text>')
    S.append(f'{I}  <text x="{rx+rw-32}" y="244" text-anchor="middle" font-family="Georgia,serif" font-size="4.5" fill="#cc4040">Maw Demon</text>')
    lx = M2_VW - 90
    S.append(f'{I}  <rect x="{lx}" y="82" width="80" height="74" fill="rgba(10,2,4,0.9)" stroke="{GOLD}" stroke-width="1" rx="3"/>')
    S.append(f'{I}  <text x="{lx+40}" y="96" text-anchor="middle" font-family="Georgia,serif" font-size="7" font-weight="bold" fill="{GOLD}">ENEMIES</text>')
    S.extend(dm_circ(lx+10,112,5,'#5a0a6a','#b030e0','BB',5))
    S.append(f'{I}  <text x="{lx+20}" y="115" font-family="Georgia,serif" font-size="5.5" fill="#d0c0a0">Bitter Breath</text>')
    S.extend(dm_circ(lx+10,132,5,'#6a0c0c','#cc2020','MW',4))
    S.append(f'{I}  <text x="{lx+20}" y="135" font-family="Georgia,serif" font-size="5.5" fill="#d0c0a0">Maw Demon</text>')
    S.append(f'{I}  <text x="{lx+20}" y="146" font-family="Georgia,serif" font-size="4.5" fill="#8a7a60">(join round 2)</text>')
    S.append(f'{I}</g>')
    return S


def gen_phase3():
    """Phase 3: Stolen Starlight — Cage Chamber transformed."""
    S = []
    rx,ry,rw,rh = P2_RX,P2_RY,P2_RW,P2_RH
    mid = rx + rw//2
    ccx,ccy = CAGE_CX,CAGE_CY

    S.append(f'{I}<rect x="0" y="0" width="{M2_VW}" height="28" fill="rgba(10,2,4,0.85)"/>')
    S.append(tx(M2_VW//2,18,'PHASE 3 &mdash; STOLEN STARLIGHT',11,GOLD,True))

    S.append(fl(rx,ry,rw,rh,'#5a5848'))
    S.append(gr(rx,ry,rw,rh,'grid1'))
    # Silver flood
    S.append(f'{I}<radialGradient id="silver-flood"><stop offset="0%" stop-color="#c0d8ff" stop-opacity="0.3"/><stop offset="60%" stop-color="#a0b8e0" stop-opacity="0.12"/><stop offset="100%" stop-color="#a0b8e0" stop-opacity="0"/></radialGradient>')
    S.append(f'{I}<circle cx="{ccx}" cy="{ccy}" r="130" fill="url(#silver-flood)"/>')

    # Frozen blood troughs
    S.append(f'{I}<rect x="{rx}" y="138" width="{rw}" height="14" fill="#484848" stroke="#3a3a3a" stroke-width="0.8" rx="2"/>')
    S.append(tx(rx+rw+8,146,'frozen blood',5.5,'#707070',False,'start'))
    S.append(f'{I}<rect x="{rx}" y="222" width="{rw}" height="14" fill="#484848" stroke="#3a3a3a" stroke-width="0.8" rx="2"/>')

    # Rubble + more falling debris
    S.append(f'{I}<polygon points="{rx},{ry} {rx+65},{ry} {rx+50},{ry+40} {rx+28},{ry+52} {rx},{ry+52}" fill="#4a3828" stroke="#3a2818" stroke-width="1"/>')
    # Additional collapse debris
    S.append(f'{I}<polygon points="{rx+rw},{ry+rh} {rx+rw-40},{ry+rh} {rx+rw-30},{ry+rh-30} {rx+rw},{ry+rh-35}" fill="#4a3828" stroke="#3a2818" stroke-width="1"/>')
    S.append(tx(rx+rw-30,ry+rh-40,'NEW RUBBLE',5,'#ff6060',True))

    # Cracked cage
    S.append(f'{I}<radialGradient id="cage-glow3"><stop offset="0%" stop-color="#e0e8ff" stop-opacity="0.5"/><stop offset="100%" stop-color="#c0d0ff" stop-opacity="0"/></radialGradient>')
    S.append(f'{I}<circle cx="{ccx}" cy="{ccy}" r="{CAGE_R+26}" fill="url(#cage-glow3)"/>')
    S.append(f'{I}<path d="M{ccx+CAGE_R},{ccy} A{CAGE_R},{CAGE_R} 0 1,0 {ccx},{ccy-CAGE_R}" fill="none" stroke="#5a6a7a" stroke-width="3"/>')
    S.append(f'{I}<path d="M{ccx+CAGE_R},{ccy} L{ccx+CAGE_R+12},{ccy+14} L{ccx+CAGE_R+8},{ccy+22}" fill="none" stroke="#5a6a7a" stroke-width="2" stroke-dasharray="3,2"/>')
    S.append(f'{I}<circle cx="{ccx}" cy="{ccy}" r="14" fill="#d0e0ff" opacity="0.22"/>')
    S.append(tx(ccx,ccy-CAGE_R-10,'CRACKED CAGE',7,'#a0c0ff',True))
    S.append(tx(ccx,ccy-CAGE_R-2,'Moonkite visible &mdash; fading',5.5,'#80a0dd'))

    # Broken chains
    for x2,y2 in [(rx,ccy-30),(rx+rw,ccy-30),(ccx,ry+rh-12),(ccx,ry+12)]:
        S.append(f'{I}<line x1="{ccx}" y1="{ccy}" x2="{x2}" y2="{y2}" stroke="#444" stroke-width="1" stroke-dasharray="4,4" opacity="0.25"/>')

    # Wall cracks (severe)
    cracks = [
        f'M{rx},{ry+30} l10,14 l-4,20 l8,12 l-3,16',
        f'M{rx+rw},{ry+50} l-8,18 l5,14 l-10,10 l4,18',
        f'M{rx+40},{ry} l-5,12 l8,10 l-3,14 l6,8',
        f'M{rx+rw-25},{ry+rh} l4,-10 l-6,-12 l5,-8 l-3,-14',
        f'M{rx},{ry+rh-30} l12,-8 l-4,-14 l10,-6',
        f'M{rx+rw},{ry+rh-60} l-10,-10 l6,-12 l-8,-8',
    ]
    for cd in cracks:
        S.append(f'{I}<path d="{cd}" fill="none" stroke="#606060" stroke-width="2" opacity="0.55"/>')
        S.append(f'{I}<path d="{cd}" fill="none" stroke="#ff8040" stroke-width="0.6" opacity="0.2"/>')

    # Orange corruption
    for cx2,cy2,r in [(ccx-45,ccy+35,20),(ccx+40,ccy-30,16),(ccx-20,ccy-50,12)]:
        S.append(f'{I}<circle cx="{cx2}" cy="{cy2}" r="{r}" fill="none" stroke="#cc6000" stroke-width="0.8" stroke-dasharray="6,4" opacity="0.2"/>')

    # Terrain labels
    S.extend(bone_pile(rx+20,ry+rh-20,'debris'))
    S.extend(weapon_frag(rx+rw-20,ry+20,'wreckage'))

    # Walls
    S.append(wl(rx,ry,rx+rw,ry))
    S.append(wl(rx,ry+rh,mid-24,ry+rh))
    S.append(wl(mid+24,ry+rh,rx+rw,ry+rh))
    S.append(wl(rx,ry,rx,ry+rh))
    S.append(wl(rx+rw,ry,rx+rw,ry+rh))
    S.append(f'{I}<path d="M{mid-24},{ry+rh} Q{mid},{ry+rh-12} {mid+24},{ry+rh}" fill="none" stroke="#5a3010" stroke-width="2"/>')

    # Escape clock
    S.append(f'{I}<rect x="{rx-6}" y="{ry+rh+36}" width="{rw+12}" height="28" fill="#3a0808" stroke="#cc2020" stroke-width="2" rx="3"/>')
    S.append(tx(mid,ry+rh+54,'ESCAPE CLOCK: 10 rounds &mdash; Palace collapsing',8,'#ff6060',True))

    S.append(tx(mid,ry+rh-18,'CAGE CHAMBER',10,LABEL_DK,True))
    S.append(tx(mid,ry+rh-6,'MYTHIC PHASE &middot; HP resets to 140',7,'#ff4040',True))

    # DM layer
    S.append(f'{I}<g class="dm-only">')
    S.extend(dm_circ(ccx,ccy+42,14,'#3a1a5a','#c050ff','BBA',8))
    S.append(f'{I}  <text x="{ccx}" y="{ccy+61}" text-anchor="middle" font-family="Georgia,serif" font-size="5" fill="#c050ff">Ascendant</text>')
    S.append(f'{I}  <text x="{ccx}" y="{ccy+69}" text-anchor="middle" font-family="Georgia,serif" font-size="4.5" fill="#a040dd">HP 140 (reset), new abilities</text>')
    lx = M2_VW - 90
    S.append(f'{I}  <rect x="{lx}" y="82" width="80" height="56" fill="rgba(10,2,4,0.9)" stroke="{GOLD}" stroke-width="1" rx="3"/>')
    S.append(f'{I}  <text x="{lx+40}" y="96" text-anchor="middle" font-family="Georgia,serif" font-size="7" font-weight="bold" fill="{GOLD}">ENEMY</text>')
    S.extend(dm_circ(lx+10,114,5,'#3a1a5a','#c050ff','BA',4))
    S.append(f'{I}  <text x="{lx+20}" y="117" font-family="Georgia,serif" font-size="5.5" fill="#d0c0a0">BB Ascendant</text>')
    S.append(f'{I}  <text x="{lx+20}" y="128" font-family="Georgia,serif" font-size="4.5" fill="#8a7a60">HP 140 (reset)</text>')
    S.append(f'{I}</g>')
    return S


def gen_map2():
    S = []
    S.append('  <div class="map-container" id="boss-arena">')
    S.append('    <div class="map-title">MAP 2 &mdash; Boss Fight Arena</div>')
    S.append('    <div class="phase-selector">')
    S.append('      <button class="phase-btn active" data-phase="1" onclick="setPhase(1)" id="ptab-1"><span class="phase-num">I</span> Throne of Gore</button>')
    S.append('      <button class="phase-btn" data-phase="2" onclick="setPhase(2)" id="ptab-2"><span class="phase-num">II</span> The Siphon</button>')
    S.append('      <button class="phase-btn" data-phase="3" onclick="setPhase(3)" id="ptab-3"><span class="phase-num">III</span> Stolen Starlight</button>')
    S.append('    </div>')
    S.append('    <div class="phase-desc" id="phase-desc">HP 280&ndash;141 &nbsp;|&nbsp; Throne Room 40&times;60 ft &nbsp;|&nbsp; 30 ft ceiling</div>')
    S.append('    <div class="chain-status" id="chain-status" style="display:none">')
    S.append('      <span>SIPHON CHAINS:</span>')
    for i in range(1,5):
        S.append(f'      <span class="chain-pip" id="cpip-{i}" title="Chain {i}">{i}</span>')
    S.append('      <span class="regen-display">Regen: <strong id="regen-val">40 HP/round</strong></span>')
    S.append('    </div>')
    S.append(f'    <svg id="boss-map" viewBox="0 0 {M2_VW} {M2_VH_P1}" xmlns="http://www.w3.org/2000/svg" style="width:100%;display:block">')

    S.extend(shared_defs())

    # Phase 1
    S.append(f'{I}<g id="p1" class="phase-layer">')
    S.extend(avernus_bg(M2_VW,M2_VH_P1,'vig_p1'))
    S.extend(lava_cracks(M2_VW,M2_VH_P1,5))
    S.extend(avernus_embers(M2_VW,M2_VH_P1,14))
    S.extend(gen_phase1())
    S.extend(compass(M2_VW-40,M2_VH_P1-40))
    S.extend(scale_bar(20,M2_VH_P1-28))
    S.append(f'{I}</g>')

    # Phase 2
    S.append(f'{I}<g id="p2" class="phase-layer" style="display:none">')
    S.extend(avernus_bg(M2_VW,M2_VH_P2,'vig_p2'))
    S.extend(lava_cracks(M2_VW,M2_VH_P2,4))
    S.extend(avernus_embers(M2_VW,M2_VH_P2,10))
    S.extend(gen_phase2())
    S.extend(compass(M2_VW-40,M2_VH_P2-40))
    S.extend(scale_bar(20,M2_VH_P2-28))
    S.append(f'{I}</g>')

    # Phase 3
    S.append(f'{I}<g id="p3" class="phase-layer" style="display:none">')
    S.extend(avernus_bg(M2_VW,M2_VH_P2,'vig_p3'))
    S.extend(lava_cracks(M2_VW,M2_VH_P2,7))
    S.extend(avernus_embers(M2_VW,M2_VH_P2,20))
    S.extend(gen_phase3())
    S.extend(compass(M2_VW-40,M2_VH_P2-40))
    S.extend(scale_bar(20,M2_VH_P2-28))
    S.append(f'{I}</g>')

    S.append('    </svg>')
    S.append('    <div class="map-note" id="boss-map-note">Click the <strong>throne</strong>, <strong>pillars</strong>, or <strong>barracks door</strong> to toggle destroyed/sealed state. Toggle Player Mode to hide enemy positions.</div>')
    S.append('  </div>')
    return '\n'.join(S)


# ━━━ CSS ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CSS_MARKER_START = '/* BATTLEMAP-CSS-START */'
CSS_MARKER_END   = '/* BATTLEMAP-CSS-END */'
MAP_CSS = f"""{CSS_MARKER_START}
  .phase-selector {{ display:flex; gap:6px; padding:8px 14px 4px; background:#0a0204; justify-content:center; flex-wrap:wrap; }}
  .phase-btn {{
    background:#1a0808; color:#9a8a6a; border:1px solid #5a3020;
    padding:7px 16px; font-family:'Cinzel',serif; font-size:9.5pt; font-weight:700;
    cursor:pointer; border-radius:3px; transition:all 0.2s; letter-spacing:0.5px;
  }}
  .phase-btn:hover {{ background:#2a1414; color:#c9a96e; }}
  .phase-btn.active {{ background:#58180d; border-color:#c9a96e; color:#fdf1dc; box-shadow:0 0 10px rgba(200,80,20,0.3); }}
  .phase-num {{ font-size:8pt; margin-right:4px; opacity:0.7; }}
  .phase-desc {{ text-align:center; font-size:9.5pt; color:#8a7a60; padding:3px 14px 6px; background:#0a0204; font-family:'Spectral',serif; font-style:italic; }}
  .chain-status {{ display:flex; gap:8px; align-items:center; justify-content:center; padding:6px 14px; background:#0a0204; font-family:'Cinzel',serif; font-size:9.5pt; color:#cc8040; flex-wrap:wrap; }}
  .chain-pip {{ display:inline-flex; align-items:center; justify-content:center; width:24px; height:24px; background:#7a3a00; border:2px solid #cc6000; border-radius:3px; font-weight:700; font-size:9pt; color:#ffd080; cursor:default; transition:all 0.2s; }}
  .chain-pip.broken {{ background:#1a1a1a; border-color:#444; color:#555; text-decoration:line-through; }}
  .regen-display {{ margin-left:8px; color:#ff8040; }}
  .regen-display strong {{ color:#ff4040; }}
  .interactive-obj {{ cursor:pointer; }}
  .interactive-obj:hover {{ filter:brightness(1.2); }}
  .chain-obj:hover .chain-line {{ stroke-width:5; }}
  body.player-mode .phase-selector {{ display:none !important; }}
  body.player-mode .phase-desc {{ display:none !important; }}
  body.player-mode .chain-status {{ display:none !important; }}
  body.player-mode .interactive-obj {{ pointer-events:none; cursor:default; }}
{CSS_MARKER_END}"""

# ━━━ JS ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
JS_MARKER_START = '// BATTLEMAP-JS-START'
JS_MARKER_END   = '// BATTLEMAP-JS-END'
MAP_JS = f"""{JS_MARKER_START}
function setPhase(n) {{
  [1,2,3].forEach(function(i) {{
    var layer = document.getElementById('p'+i);
    var tab = document.getElementById('ptab-'+i);
    if (layer) layer.style.display = (i===n) ? '' : 'none';
    if (tab) tab.classList.toggle('active', i===n);
  }});
  var descs = {{
    1: 'HP 280\\u2013141 | Throne Room 40\\u00d760 ft | 30 ft ceiling',
    2: 'HP 140\\u20131 | Cage Chamber 30\\u00d740 ft | 15 ft ceiling | Destroy chains to stop regen',
    3: 'HP 140 (reset) | Cage Chamber transformed | Mythic Phase | 10-round escape clock'
  }};
  var notes = {{
    1: 'Click the <strong>throne</strong>, <strong>pillars</strong>, or <strong>barracks door</strong> to toggle destroyed/sealed state.',
    2: 'Click <strong>chains</strong> to mark destroyed. Chain counter shows siphon regen. Chains vulnerable to radiant damage.',
    3: '<strong>Mythic phase.</strong> HP resets to 140. All chains broken. Cage cracked open. Palace collapsing.'
  }};
  document.getElementById('phase-desc').textContent = descs[n];
  document.getElementById('boss-map-note').innerHTML = notes[n];
  var cs = document.getElementById('chain-status');
  if (cs) cs.style.display = (n===2) ? '' : 'none';
  var svg = document.getElementById('boss-map');
  if (svg) svg.setAttribute('viewBox', n===1 ? '0 0 {M2_VW} {M2_VH_P1}' : '0 0 {M2_VW} {M2_VH_P2}');
}}
function toggleMapObj(el) {{
  var state = el.dataset.state;
  var overlays = el.querySelectorAll('.obj-overlay');
  if (state === 'intact' || state === 'closed' || state === 'open') {{
    el.dataset.state = 'destroyed';
    overlays.forEach(function(o) {{ o.style.display = ''; }});
    if (el.id === 'throne-obj') {{
      var ext = document.getElementById('aura-30');
      if (ext) ext.style.display = 'none';
    }}
  }} else {{
    el.dataset.state = 'intact';
    overlays.forEach(function(o) {{ o.style.display = 'none'; }});
    if (el.id === 'throne-obj') {{
      var ext = document.getElementById('aura-30');
      if (ext) ext.style.display = '';
    }}
  }}
}}
function toggleChain(n) {{
  var el = document.getElementById('chain-'+n);
  if (!el) return;
  var lines = el.querySelectorAll('.chain-line, .chain-pulse, .chain-anchor');
  var overlays = el.querySelectorAll('.obj-overlay');
  if (el.dataset.state === 'intact') {{
    el.dataset.state = 'destroyed';
    lines.forEach(function(l) {{ l.style.display = 'none'; }});
    overlays.forEach(function(o) {{ o.style.display = ''; }});
  }} else {{
    el.dataset.state = 'intact';
    lines.forEach(function(l) {{ l.style.display = ''; }});
    overlays.forEach(function(o) {{ o.style.display = 'none'; }});
  }}
  updateChainCounter();
}}
function updateChainCounter() {{
  var intact = 0;
  for (var i = 1; i <= 4; i++) {{
    var ch = document.getElementById('chain-'+i);
    var pip = document.getElementById('cpip-'+i);
    var ok = ch && ch.dataset.state === 'intact';
    if (ok) intact++;
    if (pip) pip.classList.toggle('broken', !ok);
  }}
  var rv = document.getElementById('regen-val');
  if (rv) rv.textContent = (intact * 10) + ' HP/round';
}}
{JS_MARKER_END}"""


# ━━━ FILE MODIFICATION ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
def find_container_end(content, start):
    depth = 0
    i = start
    n = len(content)
    while i < n:
        if content[i] == '<':
            rest = content[i:i+10]
            if rest.startswith('<div') and (len(rest) < 5 or rest[4] in ' >\t\n\r/'):
                depth += 1
                i += 4
            elif rest.startswith('</div>'):
                depth -= 1
                if depth == 0:
                    end = i + 6
                    if end < n and content[end] == '\n': end += 1
                    return end
                i += 6
            else:
                i += 1
        else:
            i += 1
    raise ValueError("Unbalanced div tags")

def replace_map_block(content, title_marker, new_html):
    ti = content.index(title_marker)
    si = content.rindex('<div class="map-container"', 0, ti)
    ei = find_container_end(content, si)
    return content[:si] + new_html + '\n' + content[ei:]

def replace_or_insert(content, marker_start, marker_end, new_block, before_tag):
    """Replace marked block, or insert before `before_tag` if not found."""
    if marker_start in content:
        si = content.index(marker_start)
        ei = content.index(marker_end, si) + len(marker_end)
        if ei < len(content) and content[ei] == '\n': ei += 1
        return content[:si] + new_block + '\n' + content[ei:]
    else:
        ti = content.index(before_tag)
        return content[:ti] + new_block + '\n' + content[ti:]

def main():
    with open(FILE, 'r', encoding='utf-8') as f:
        content = f.read()

    print("Replacing Map 2 with Avernus-themed phase-switching arena...")
    content = replace_map_block(content, '<div class="map-title">MAP 2', gen_map2())

    print("Replacing Map 1 with Avernus-themed dungeon map...")
    content = replace_map_block(content, '<div class="map-title">MAP 1', gen_map1())

    print("Inserting/updating battlemap CSS...")
    content = replace_or_insert(content, CSS_MARKER_START, CSS_MARKER_END, MAP_CSS, '</style>')

    print("Inserting/updating battlemap JS...")
    content = replace_or_insert(content, JS_MARKER_START, JS_MARKER_END, MAP_JS, '</script>')

    with open(FILE, 'w', encoding='utf-8') as f:
        f.write(content)

    print("Done. Full-page Avernus-themed battlemaps applied.")
    print("  - Full-width SVGs (no max-width constraint)")
    print("  - Avernus palette: charred stone, blood pools, infernal glyphs, ember particles")
    print("  - Terrain objects: bone piles, gore splatters, weapon debris, chains, glyphs, braziers")
    print("  - Red-black vignette atmosphere with lava cracks")
    print("  - 3-phase boss arena with interactive objects and chain counter")
    print("  - Idempotent: safe to re-run")

if __name__ == '__main__':
    main()

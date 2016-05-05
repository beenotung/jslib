function toArray(htmlCollection) {
    return [].slice.call(htmlCollection);
}
function pushIfNotExist(arr, o) {
    if (arr.indexOf(o) == -1) {
        arr.push(o);
        return true;
    }
    return false;
}
function objectCopy(src, dest, filter, recursive) {
    if (filter === void 0) { filter = function (key, value) { return true; }; }
    if (recursive === void 0) { recursive = false; }
    if (src == null || dest == null)
        throw Error('src and dest should not be null');
    for (var key in src) {
        var value = src[key];
        if (filter(key, value)) {
            if (recursive && value != null && typeof (value) === 'object' && !(value instanceof Array)) {
                var clonedValue = {};
                objectCopy(value, clonedValue, filter, recursive);
                dest[key] = clonedValue;
            }
            else {
                dest[key] = value;
            }
        }
    }
}
/**@return parentNode if found (only first matched node), false if not found */
function findParent(node, parentFilter) {
    for (var parent = node;;) {
        parent = parent.parentNode;
        if (parent == null)
            return false;
        else if (parentFilter(parent))
            return parent;
    }
}
/**
 * @return true if the value has been set, false if the value is not modified
 * */
function initProperty(object, propertyName, initValue, replace) {
    if (replace === void 0) { replace = false; }
    if (propertyName.indexOf('.') == -1) {
        if (object[propertyName] === undefined || replace) {
            object[propertyName] = initValue;
            return true;
        }
        else
            return false;
    }
    else {
        var hasSet = false;
        var propertyNames = propertyName.split('.');
        var currentNode = object;
        propertyNames.forEach(function (propertyName, index) {
            if (index == (propertyNames.length - 1))
                hasSet = initProperty(currentNode, propertyName, initValue) || hasSet;
            else
                hasSet = initProperty(currentNode, propertyName, {}) || hasSet;
            currentNode = currentNode[propertyName];
        });
        return hasSet;
    }
}
/**
 * @param radio : HTMLInputElement
 * @param container : HTMLElement|Document
 * @return boolean
 * */
function isRadioSelected(radio, container) {
    if (container === void 0) { container = document; }
    var radioName = radio.name;
    var selectedRadio = $('input[name=' + radioName + ']:checked', container);
    return radio.value == selectedRadio.val();
}
function object_filter_by_type(obj, type, includeInherit) {
    if (includeInherit === void 0) { includeInherit = true; }
    return getKeys(obj, includeInherit)
        .filter(function (key) {
        return typeof (obj[key]) === type;
    });
}
function getKeys(obj, includeInherit) {
    if (includeInherit === void 0) { includeInherit = true; }
    if (includeInherit) {
        var keys = [];
        for (var key in obj)
            keys.push(key);
        return keys;
    }
    else
        return Object.keys(obj);
}
function getMaxDepth(obj, includeInherit, depth) {
    if (includeInherit === void 0) { includeInherit = true; }
    if (depth === void 0) { depth = 0; }
    var keys = getKeys(obj, includeInherit);
    if (keys.length == 0)
        return depth;
    else
        return keys
            .map(function (k) { return getMaxDepth(obj[k], includeInherit, depth + 1); })
            .reduce(function (a, c) { return a > c ? a : c; });
}
function recursiveIterate(o, parentKey, includeInherit, iterator, callback) {
    if (parentKey === void 0) { parentKey = null; }
    if (includeInherit === void 0) { includeInherit = true; }
    var ks = getKeys(o, includeInherit);
    if (ks.length == 0)
        return callback(o, parentKey);
    else
        return iterator(o, function (v, k) { return recursiveIterate(v, k, includeInherit, iterator, callback); });
}
/** @deprecated not helpful */
function array_emptyOrFilled(array, emptyCallback, filledCallback) {
    if (array.length == 0)
        emptyCallback();
    else
        filledCallback();
}
function isDefined(value, allowNull) {
    if (allowNull === void 0) { allowNull = false; }
    return !(typeof value === "undefined" || (!allowNull && value == null));
}
function hasProperty(obj, key, allowNull) {
    if (allowNull === void 0) { allowNull = false; }
    if (!isDefined(obj, allowNull))
        return false;
    else
        return isDefined(obj[key], allowNull);
}
function ensure(value, allowNull, type) {
    if (allowNull === void 0) { allowNull = false; }
    if (type === void 0) { type = null; }
    if (isDefined(value, allowNull))
        if (type == null)
            return value;
        else
            return typeof value == type;
    else
        throw new ReferenceError();
}
/*    Lang utils    */
function cast(x) {
    return x;
}
/* this function is used to replace the case below :
 * val v;
 * if(b)
 *   v=t;
 * else
 *   v=f;
 **/
function ifVal(b, t, f) {
    if (b)
        return t;
    else
        return f;
}
function ifFunVal(b, fun, v, logError) {
    if (b === void 0) { b = true; }
    if (logError === void 0) { logError = false; }
    if (!b)
        return v;
    try {
        return fun();
    }
    catch (e) {
        if (logError)
            console.error(e);
        return v;
    }
}
function xor(a, b) {
    return !!(a ^ b);
}
function sign(a) {
    return ifVal(a > 0, 1, ifVal(a < 0, -1, 0));
}
function swap(o, a, b) {
    var t = o[a];
    o[a] = o[b];
    o[b] = t;
}
//# sourceMappingURL=utils.js.map